import jwt from 'jsonwebtoken'
import eJWT from 'express-jwt'
import Session from '~/api/session'
import { uid } from 'rand-token'
import { extractToken, extractMaster } from 's/auth/utils'
import { jwtConfig, masterKey } from '~/config'

// Get JWT Secret
const { secret } = jwtConfig

export const verify = async (token, secret) => jwt.verify(token, secret)

const isRevokedCallback = async (req, res, done) => {
    try {
        const { jti } = await verify(extractToken(req), secret)
        return done(null, !await Session.exists({ jti }))
    } catch (error) {
        return done(null, true)
    }
}

// Define user roles
export const roles = ['guest', 'user', 'admin']
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwtSessionToken:
 *       type: http
 *       scheme: bearer
 */
export const sign = async ({ _id, role, device = {} }) => {
    try {
        const token = await jwt.sign({ _id, role }, secret, { expiresIn: jwtConfig.expiresIn, jwtid: uid(12) })
        const tokenInformation = await jwt.decode(token)
        await Session.create({ jti: tokenInformation.jti, user: _id, device })
        return Object.assign(tokenInformation, { token })
    } catch (error) {
    // TODO: error handling (catch and response)
    // TODO: if token expired -> force remove from collection
        console.log(error)
    }

}


export const decodeJWT = async token => jwt.decode(token)

// Destroy token from index
export const destroy = async (req) => {
    const { jti } = await jwt.decode(extractToken(req))
    await Session.findOneAndRemove({ jti })
}

// Main middleware validator
export const doorman = eJWT({ ...jwtConfig, ...{ isRevoked: isRevokedCallback } })

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     masterKey:
 *       type: apiKey
 *       in: query
 *       name: master
 */
export const masterman = () => (req, res, next) =>  masterKey === extractMaster(req) ? next() : res.status(401).end()
