import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Message, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/messages/:
 *    post:
 *      summary: Create a new Message
 *      tags: [Messages]
 *      security:
 *        - jwtSessionToken: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *      responses:
 *        "201":
 *          description: A message schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Message'
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.post(
    '/',
    body({
        content
    }),
    addAuthor({ required: false, addBody: true }),
    create
)

// TODO: Pagination docs
/**
 * @swagger
 * path:
 *  api/messages/:
 *    get:
 *      summary: Get messages
 *      tags: [Messages]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A message schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/messages/{messageId}:
 *    get:
 *      summary: Get Message
 *      tags: [Messages]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: messageId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the message to get
 *      responses:
 *        "200":
 *          description: A message schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Message not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/messages/{messageId}:
 *    put:
 *      summary: Update message
 *      tags: [Messages]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: messageId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the message to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Message schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Message not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/messages/{messageId}:
 *    delete:
 *      summary: Delete message
 *      tags: [Messages]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: messageId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the message to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted message
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Message not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
