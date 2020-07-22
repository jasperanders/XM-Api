import { Router } from 'express'
import { schema } from './model'
export Verification, { schema } from './model'

import {
    verify
} from './controller'

const router = new Router()
const { token } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Verification
 *   description: Verify a user
 */

/**
 * @swagger
 * path:
 *  /api/verification/{token}:
 *    get:
 *      summary: Verify user
 *      tags: [Verification]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: Token which got sent per mail
 *      responses:
 *        "204":
 *          description: Success
 *        "404":
 *          description: User or Token not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:token', verify)

export default router
