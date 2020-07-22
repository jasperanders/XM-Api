import 'dotenv/config'
import request from 'supertest'
import server from '~/server'
import { Router } from 'express'
import User from 'a/user/model'
import { sign } from 's/auth'
import { apiRoot } from '~/config'
import Verification from 'a/verification/model'
import { FORBIDDEN, NO_CONTENT } from 'http-status-codes'

let defaultUser,
    defaultToken,
    adminUser,
    adminToken,
    token,
    apiEndpoint = 'verification'

beforeEach(async () => {

    defaultUser = await User.create({
        nane: 'Marty',
        email: 'marty0@getit.social',
        password: 'GeilesPasswort123?!',
        role: 'user'
    })

    adminUser = await User.create({
        name: 'Marty',
        email: 'marty@getit.social',
        password: 'SuperPasswort123?!',
        role: 'admin'
    })

    // Sign in user
    adminToken = (await sign(adminUser)).token
    defaultToken = (await sign(defaultUser)).token

    const verification = await Verification.create({
        user: defaultUser._id
    })

    token = verification.token

})

describe(`TEST ${apiRoot}/${apiEndpoint} ACL`,  () => {

    test(`GET ${apiRoot}/${apiEndpoint} USER FORBIDDEN`, async () => {
        const { status } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${token}`)
            .set('Authorization', `Bearer ${defaultToken}`)

        expect(status).toBe(FORBIDDEN)
    })

    test(`GET ${apiRoot}/${apiEndpoint} GUEST NO_CONTENT`, async () => {
        const { status } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${token}`)

        expect(status).toBe(NO_CONTENT)
    })

    test(`GET ${apiRoot}/${apiEndpoint} ADMIN FORBIDDEN`, async () => {
        const { status } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${token}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(status).toBe(FORBIDDEN)
    })

})

describe(`TEST ${apiRoot}/${apiEndpoint}`,  () => {

    test(`GET ${apiRoot}/${apiEndpoint} GUEST NO_CONTENT`, async () => {

        const { status } = await request(server)
            .get(`${apiRoot}/${apiEndpoint}/${token}`)

        expect(status).toBe(NO_CONTENT)

        const { verified } = await User.findById(defaultUser._id)
        expect(verified).toBe(true)
    })

})