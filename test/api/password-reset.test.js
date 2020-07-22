
import 'dotenv/config'
import request from 'supertest'
import server from '~/server'
import { Router } from 'express'
import User from 'a/user/model'
import Session from 'a/session/model'
import { sign } from 's/auth'
import { apiRoot, masterKey } from '~/config'
import PasswordReset from 'a/password-reset/model'
import { FORBIDDEN, NO_CONTENT, OK, BAD_REQUEST } from 'http-status-codes'

let defaultUser,
    defaultToken,
    adminUser,
    adminToken,
    token,
    apiEndpoint = 'password-reset'

beforeEach(async () => {

    adminUser = await User.create({
        nane: 'Marty',
        email: 'marty@getit.social',
        password: 'GeilesPasswort123?!',
        role: 'user',
        verified: true
    })

    defaultUser = await User.create({
        nane: 'Marty',
        email: 'marty0@getit.social',
        password: 'GeilesPasswort123?!',
        role: 'user',
        verified: true
    })

    defaultToken = (await sign(defaultUser)).token
    adminToken = (await sign(adminUser)).token

    const reset = await PasswordReset.create({
        user: defaultUser._id
    })

    token = reset.token

})

describe(`TEST ${apiRoot}/${apiEndpoint} ACL`,  () => {

    test(`POST ${apiRoot}/${apiEndpoint} USER FORBIDDEN`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .set('Authorization', `Bearer ${defaultToken}`)
            .send({ email: defaultUser.email })

        expect(status).toBe(FORBIDDEN)
    })

    test(`POST ${apiRoot}/${apiEndpoint} GUEST NO_CONTENT`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .send({ email: defaultUser.email })

        expect(status).toBe(NO_CONTENT)
    })

    test(`POST ${apiRoot}/${apiEndpoint} ADMIN FORBIDDEN`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ email: defaultUser.email })

        expect(status).toBe(FORBIDDEN)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint}/:token USER FORBIDDEN`, async () => {
        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${token}`)
            .set('Authorization', `Bearer ${defaultToken}`)
            .send({ password: 'Passwort123?!!?' })

        expect(status).toBe(FORBIDDEN)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint}/:token GUEST NO_CONTENT`, async () => {
        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${token}`)
            .send({ password: 'Passwort123?!!?' })

        expect(status).toBe(NO_CONTENT)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint}/:token ADMIN FORBIDDEN`, async () => {
        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${token}`)
            .send({ password: 'Passwort123?!!?' })
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(FORBIDDEN)
    })

})

describe(`TEST ${apiRoot}/${apiEndpoint}`,  () => {

    test(`POST ${apiRoot}/${apiEndpoint} GUEST NO_CONTENT`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .send({ email: defaultUser.email })

        expect(status).toBe(NO_CONTENT)
        const reset = await PasswordReset.findOne({ user: defaultUser._id })
        expect(reset).not.toBeUndefined()
        expect(reset.token).not.toBeUndefined()
    })

    test(`POST ${apiRoot}/${apiEndpoint} GUEST NO_CONTENT USER ENUMERATION`, async () => {
        const { status } = await request(server)
            .post(`${apiRoot}/${apiEndpoint}?master=${masterKey}`)
            .send({ email: 'bullshitmail@lolol.com' })

        expect(status).toBe(NO_CONTENT)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint} GUEST NOT VERIFIED`, async () => {

        const unverifiedUser = await User.create({
            nane: 'Marty',
            email: 'unverified@getit.social',
            password: 'GeilesPasswort123?!',
            role: 'user',
            verified: false
        })

        const reset = await PasswordReset.create({
            user: unverifiedUser._id
        })

        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${reset.token}`)
            .send({ password: 'Passwort123?!!!' })

        expect(status).toBe(FORBIDDEN)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint} GUEST DELETED USER`, async () => {

        const unverifiedUser = await User.create({
            nane: 'Marty',
            email: 'unverified@getit.social',
            password: 'GeilesPasswort123?!',
            role: 'user',
            verified: true
        })

        const reset = await PasswordReset.create({
            user: unverifiedUser._id
        })
        await unverifiedUser.remove()

        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${reset.token}`)
            .send({ password: 'Passwort123?!!!' })

        expect(status).toBe(FORBIDDEN)
    })

    test(`PATCH ${apiRoot}/${apiEndpoint}/:token GUEST NO_CONTENT`, async () => {
        const oldUser = await User.findById(defaultUser._id)
        const { status } = await request(server)
            .patch(`${apiRoot}/${apiEndpoint}/${token}`)
            .send({ password: 'Passwort123?!!?' })

        const updatedUser = await User.findById(defaultUser._id)
        expect(status).toBe(NO_CONTENT)
        expect(oldUser.password).not.toBe(updatedUser.password)
        const reset = await PasswordReset.findOne({ token })
        expect(reset).toBeNull()

        expect(await Session.exists({ user: defaultUser._id })).toBe(false)
    })

    test(`GET ${apiRoot}/${apiEndpoint}/:token GUEST OK`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${token}`)

        expect(status).toBe(OK)
        const { picture, name } = body
        expect(picture).not.toBeUndefined()
        expect(name).not.toBeUndefined()
    })

    test(`GET ${apiRoot}/${apiEndpoint}/:token GUEST BAD_REQUEST`, async () => {
        const { status, body } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/123`)

        expect(status).toBe(BAD_REQUEST)
    })

})