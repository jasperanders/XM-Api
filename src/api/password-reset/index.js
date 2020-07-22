import { Router } from 'express'
export PasswordReset, { schema } from './model'
import { masterman } from '~/services/auth'
import { middleware as body } from 'bodymen'
import { schema as userSchema } from 'a/user/model'
import {
    create,
    show,
    update
} from './controller'

/**
 * @swagger
 * tags:
 *   name: Password-Reset
 *   description: Reset user password
 */

const router = new Router()

const { email, password } = userSchema.tree

/**
 * @swagger
 * path:
 *  /api/password-reset/{token}:
 *    get:
 *      summary: Get information about password reset
 *      tags: [Password-Reset]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: Token which got sent by mail
 *      responses:
 *        "200":
 *          description: picture+name from user which requested the password-reset
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  picture:
 *                    type: string
 *                    format: uri
 *        "404":
 *          description: User or Token not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:token', show)

/**
 * @swagger
 * path:
 *  /api/password-reset/:
 *    post:
 *      summary: Create a new password-reset thingy
 *      tags: [Password-Reset]
 *      security:
 *        - masterKey: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *      responses:
 *        "204":
 *          description: Password-Reset mail got sent or user does not exist
 *        "400":
 *          description: Invalid Body
 *        "401":
 *          description: Missing masterkey
 *        "500":
 *          description: Oh boi
 */
router.post(
    '',
    masterman(),
    body({
        email,
    }),
    create
)

/**
 * @swagger
 * path:
 *  /api/password-reset/{token}:
 *    put:
 *      summary: Update user password
 *      tags: [Password-Reset]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: Password-Reset token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *      responses:
 *        "204":
 *          description: Successful update
 *        "400":
 *          description: Password doesn't match the requirements
 *        "403":
 *          description: Missing permissions (User does not exist or is not verified)
 *        "500":
 *          description: Oh boi
 */
router.patch(
    '/:token',
    body({
        password
    }),
    update
)

export default router
