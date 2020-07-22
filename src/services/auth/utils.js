import { hash, verify } from 'argon2'
/**
 * Extract the given token from Header, Query or Body
 * @param {object} req - Incoming Request
 * @returns {string} The token.
 */
export const extractToken = req => {
    // Extract JWT from Header
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }

    // Extract JWT from Query
    if (req.query?.token) {
        return req.query.token
    }

    // Extract JWT from Body
    if (req.body?.token) {
        return req.body.token
    }

    return null
}

export const extractMaster = req => {

    // Extract JWT from Header
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }

    // Extract JWT from Query
    if (req.query?.master) {
        return req.query.master
    }

    // Extract JWT from Body
    if (req.body?.master) {
        return req.body.master
    }

    return null
}

/**
 * Validate Middleware - cannot create user with another roles
 */
export const validateUserBeforeCreate = () => ({ body }, res, next) =>
	body?.role ? res.status(401).end() : next()

/**
 * Hash the Password with argon2
 * @param {string} password
 * @returns {Promise} The hashed password.
 */
export const hashPassword = async password => await hash(password)

/**
 * Compare the argon2 password
 * @param {string} password
 * @returns {Promise} The boolean compared return
 */
export const comparePassword = async (password, comparePassword) => await verify(password, comparePassword)
