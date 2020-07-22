import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export MultipleChoiceAnswer, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: MultipleChoiceAnswers
 *   description: MultipleChoiceAnswer management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/multiple_choice_answers/:
 *    post:
 *      summary: Create a new MultipleChoiceAnswer
 *      tags: [MultipleChoiceAnswers]
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
 *          description: A multiple_choice_answer schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MultipleChoiceAnswer'
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
 *  api/multiple_choice_answers/:
 *    get:
 *      summary: Get multiple_choice_answers
 *      tags: [MultipleChoiceAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A multiple_choice_answer schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/multiple_choice_answers/{multiple_choice_answerId}:
 *    get:
 *      summary: Get MultipleChoiceAnswer
 *      tags: [MultipleChoiceAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_answer to get
 *      responses:
 *        "200":
 *          description: A multiple_choice_answer schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/multiple_choice_answers/{multiple_choice_answerId}:
 *    put:
 *      summary: Update multiple_choice_answer
 *      tags: [MultipleChoiceAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_answer to update
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
 *          description: MultipleChoiceAnswer schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/multiple_choice_answers/{multiple_choice_answerId}:
 *    delete:
 *      summary: Delete multiple_choice_answer
 *      tags: [MultipleChoiceAnswers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_answer to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted multiple_choice_answer
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceAnswer not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
