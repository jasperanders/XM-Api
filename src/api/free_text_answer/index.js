import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export FreeTextAnswer, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: FreeTextAnswers
 *   description: FreeTextAnswer management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/free_text_answers/:
 *    post:
 *      summary: Create a new FreeTextAnswer
 *      tags: [FreeTextAnswers]
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
 *          description: A free_text_answer schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FreeTextAnswer'
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
 *  api/free_text_answers/:
 *    get:
 *      summary: Get free_text_answers
 *      tags: [FreeTextAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A free_text_answer schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/free_text_answers/{free_text_answerId}:
 *    get:
 *      summary: Get FreeTextAnswer
 *      tags: [FreeTextAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_answer to get
 *      responses:
 *        "200":
 *          description: A free_text_answer schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/free_text_answers/{free_text_answerId}:
 *    put:
 *      summary: Update free_text_answer
 *      tags: [FreeTextAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_answer to update
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
 *          description: FreeTextAnswer schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/free_text_answers/{free_text_answerId}:
 *    delete:
 *      summary: Delete free_text_answer
 *      tags: [FreeTextAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_answer to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted free_text_answer
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
