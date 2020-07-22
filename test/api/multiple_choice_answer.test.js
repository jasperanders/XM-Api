import 'dotenv/config'
import request from 'supertest'
import server from '~/server'
import { Router } from 'express'
import { sign, doorman } from 's/auth'
import { addAuthor } from 's/request'
import User from 'a/user/model'
import { MultipleChoiceAnswer as Data } from 'a/multiple_choice_answer'
import { apiRoot, masterKey } from '~/config'
import { NOT_FOUND, OK, CREATED, FORBIDDEN, NO_CONTENT, UNAUTHORIZED, BAD_REQUEST } from 'http-status-codes'

let adminUser,
    adminToken,
    defaultUser,
    defaultToken,
    guestData,
    userData,
    adminData,
    apiEndpoint = 'multiple_choice_answers'

beforeEach(async () => {

    adminUser = await User.create({
        name: 'Marty',
        email: 'marty@getit.social',
        password: 'SuperPasswort123?!',
        role: 'admin'
    })

    defaultUser = await User.create({
        name: 'Marty',
        email: 'marty0@getit.social',
        password: 'SuperPasswort123?!',
        role: 'user'
    })

    guestData = await Data.create({ content: 'yeet' })
    userData = await Data.create({ content: 'yoot', author: defaultUser._id })
    adminData = await Data.create({ content: 'yuut', author: adminUser._id })
    // Sign in user
    adminToken = (await sign(adminUser)).token
    defaultToken = (await sign(defaultUser)).token

    const datas = Array(100)

    for (let index = 0; index < datas.length; index += 1) {
        datas[index] = new Data({ content: 'hello world' })
    }

    await Data.insertMany(datas)

})

describe(`TEST ${apiRoot}/${apiEndpoint} ACL`,  () => {

    // INDEX
    test(`GET ${apiRoot}/${apiEndpoint} ADMIN OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}`)

        expect(status).toBe(OK)

        // check if view worked, pagination gets tested separately
        const { rows } = body
        const [ first ] = rows
        const keys = Object.keys(first)
        expect(keys).toEqual(expect.arrayContaining(['content']))
    })

    test(`GET ${apiRoot}/${apiEndpoint} ADMIN OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}`)
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(OK)

        // check if view worked, pagination gets tested separately
        const { rows } = body
        const [ first ] = rows
        const keys = Object.keys(first)
        expect(keys).toEqual(expect.arrayContaining(['content']))
    })

    test(`GET ${apiRoot}/${apiEndpoint} ADMIN OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(OK)

        // check if view worked, pagination gets tested separately
        const { rows } = body
        const [ first ] = rows
        const keys = Object.keys(first)
        expect(keys).toEqual(expect.arrayContaining(['content']))
    })

    // SHOW
    test(`GET ${apiRoot}/${apiEndpoint}/:id GUEST OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${userData._id}`)

        expect(status).toBe(OK)

        const authorKeys = Object.keys(body.author)
        expect(authorKeys).toEqual(expect.arrayContaining(['name', 'email']))

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    test(`GET ${apiRoot}/${apiEndpoint}/:id USER OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(OK)

        const authorKeys = Object.keys(body.author)
        expect(authorKeys).toEqual(expect.arrayContaining(['name', 'email']))

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    test(`GET ${apiRoot}/${apiEndpoint}/:id ADMIN OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(OK)

        const authorKeys = Object.keys(body.author)
        expect(authorKeys).toEqual(expect.arrayContaining(['name', 'email']))

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    // CREATE
    test(`POST ${apiRoot}/${apiEndpoint}/ GUEST CREATED`, async () => {
        const { status, body } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}`)
            .send({ content: 'muh first post'})

        expect(status).toBe(CREATED)
        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content']))
    })

    test(`POST ${apiRoot}/${apiEndpoint}/ GUEST CREATED`, async () => {
        const { status, body } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}`)
            .send({ content: 'muh first post'})
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(CREATED)

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    test(`POST ${apiRoot}/${apiEndpoint}/ ADMIN CREATED`, async () => {
        const { status, body } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ content: 'muh first post'})

        expect(status).toBe(CREATED)

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    // UPDATE
    test(`PUT ${apiRoot}/${apiEndpoint}/:id GUEST FORBIDDEN`, async () => {
        const { status } = await request(server)
            .put(`${apiRoot}/${apiEndpoint}/${guestData._id}`)
            .send({ content: 'updated content?' })
        expect(status).toBe(FORBIDDEN)
    })

    test(`PUT ${apiRoot}/${apiEndpoint}/:id USER OK`, async () => {
        const { status, body } = await request(server)
            .put(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${defaultToken}`)
            .send({ content: 'EDIT' })

        expect(status).toBe(OK)

        const authorKeys = Object.keys(body.author)
        expect(authorKeys).toEqual(expect.arrayContaining(['name', 'email']))

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))
    })

    test(`PUT ${apiRoot}/${apiEndpoint}/:id USER FORBIDDEN (OWNERSHIP)`, async () => {
        const { status, body } = await request(server)
            .put(`${apiRoot}/${apiEndpoint}/${adminData._id}`)
            .set('Authorization', `Bearer ${defaultToken}`)
            .send({ content: 'git gud' })

        expect(status).toBe(FORBIDDEN)
    })

    test(`PUT ${apiRoot}/${apiEndpoint}/:id ADMIN OK`, async () => {
        const { status, body } = await request(server)
            .put(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ content: 'censored' })

        expect(status).toBe(OK)

        const authorKeys = Object.keys(body.author)
        expect(authorKeys).toEqual(expect.arrayContaining(['name', 'email']))

        const keys = Object.keys(body)
        expect(keys).toEqual(expect.arrayContaining(['content', 'author']))    })

    test(`PUT ${apiRoot}/${apiEndpoint}/:id ADMIN NOT_FOUND`, async () => {
        const { status, body } = await request(server)
            .put(`${apiRoot}/${apiEndpoint}/5ee5309727c6997fa0339135`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ content: 'reee' })

        expect(status).toBe(NOT_FOUND)
    })

    // DELETE
    test(`DELETE ${apiRoot}/${apiEndpoint}/:id GUEST FORBIDDEN`, async () => {
        const { status } = await request(server)
            .delete(`${apiRoot}/${apiEndpoint}/${userData._id}`)
        expect(status).toBe(FORBIDDEN)
    })

    test(`DELETE ${apiRoot}/${apiEndpoint}/:id USER NO_CONTENT`, async () => {
        const { status, body } = await request(server)
            .delete(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(NO_CONTENT)
    })

    test(`DELETE ${apiRoot}/${apiEndpoint}/:id USER FORBIDDEN (OWNERSHIP)`, async () => {
        const { status, body } = await request(server)
            .delete(`${apiRoot}/${apiEndpoint}/${adminData._id}`)
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(FORBIDDEN)
    })

    test(`DELETE ${apiRoot}/${apiEndpoint}/:id ADMIN NO_CONTENT`, async () => {
        const { status, body } = await request(server)
            .delete(`${apiRoot}/${apiEndpoint}/${userData._id}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(NO_CONTENT)
    })

    test(`DELETE ${apiRoot}/${apiEndpoint}/:id ADMIN NOT_FOUND`, async () => {
        const { status, body } = await request(server)
            .delete(`${apiRoot}/${apiEndpoint}/5ee5309727c6997fa0339135`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(NOT_FOUND)
    })

})

describe(`TEST ${apiRoot}/${apiEndpoint} VALIDATION`,  () => {

    test(`POST ${apiRoot}/${apiEndpoint}/ GUEST BAD CONTENT`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}`)
            .send({ content: '' })

        expect(status).toBe(BAD_REQUEST)
    })

})


describe(`TEST ${apiRoot}/${apiEndpoint} PAGINATION`,  () => {

    test(`GET ${apiRoot}/${apiEndpoint}/ GUEST OK`, async () => {
        const { status, body: { rows, count, nextPage, prevPage, page }  } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}`)

        expect(status).toBe(OK)

        expect(rows).not.toBeUndefined()
        expect(count).not.toBeUndefined()
        expect(nextPage).not.toBeUndefined()
        expect(prevPage).not.toBeUndefined()
        expect(page).not.toBeUndefined()

        expect(Array.isArray(rows)).toBe(true)

        expect(page).toBe(1)
        expect(prevPage).toBe(null)
        expect(nextPage).toBe(2)

    })

    test(`GET ${apiRoot}/${apiEndpoint}/ GUEST OK LIMIT=1`, async () => {
        const { status, body: { rows, count, nextPage, prevPage, page }  } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}?limit=1`)

        expect(status).toBe(OK)

        expect(rows).not.toBeUndefined()
        expect(count).not.toBeUndefined()
        expect(nextPage).not.toBeUndefined()
        expect(prevPage).not.toBeUndefined()
        expect(page).not.toBeUndefined()

        expect(Array.isArray(rows)).toBe(true)

        expect(page).toBe(1)
        expect(prevPage).toBe(null)
        expect(nextPage).toBe(2)

        expect(rows).toHaveLength(1)

    })

    test(`GET ${apiRoot}/${apiEndpoint}/ GUEST OK PAGE=2`, async () => {
        const { status, body: { rows, count, nextPage, prevPage, page }  } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}?page=2`)

        expect(status).toBe(OK)

        expect(rows).not.toBeUndefined()
        expect(count).not.toBeUndefined()
        expect(nextPage).not.toBeUndefined()
        expect(prevPage).not.toBeUndefined()
        expect(page).not.toBeUndefined()

        expect(Array.isArray(rows)).toBe(true)

        expect(page).toBe(2)
        expect(prevPage).toBe(1)
        expect(nextPage).toBe(3)

        expect(rows).toHaveLength(30)

    })

    test(`GET ${apiRoot}/${apiEndpoint}/ GUEST BAD_REQUEST LIMIT=1000`, async () => {
        const { status, body: { rows, count, nextPage, prevPage, page }  } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}?limit=1000`)

        expect(status).toBe(BAD_REQUEST)

    })

    test(`GET ${apiRoot}/${apiEndpoint}/ GUEST OK LIMIT=100`, async () => {
        const { status, body: { rows, count, nextPage, prevPage, page }  } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}?limit=100&page=2`)

        expect(status).toBe(OK)

        expect(rows).not.toBeUndefined()
        expect(count).not.toBeUndefined()
        expect(nextPage).not.toBeUndefined()
        expect(prevPage).not.toBeUndefined()
        expect(page).not.toBeUndefined()

        expect(Array.isArray(rows)).toBe(true)

        expect(page).toBe(2)
        expect(prevPage).toBe(1)
        expect(nextPage).toBe(null)

    })

})
