import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { addAuthor } from 's/request'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Exam, { schema } from './model'

const { content } = schema.tree
/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam management
 */
const router = new Router()

/**
 * @swagger
 * path:
 *  api/exams/:
 *    post:
 *      summary: Create a new Exam
 *      tags: [Exams]
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
 *          description: A exam schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exam'
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
 *  api/exams/:
 *    get:
 *      summary: Get exams
 *      tags: [Exams]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A exam schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get('/', query(), index)

/**
 * @swagger
 * path:
 *  api/exams/{examId}:
 *    get:
 *      summary: Get Exam
 *      tags: [Exams]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: examId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the exam to get
 *      responses:
 *        "200":
 *          description: A exam schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Exam not found
 *        "500":
 *          description: Oh boi
 */
router.get('/:id', show)

/**
 * @swagger
 * path:
 *  api/exams/{examId}:
 *    put:
 *      summary: Update exam
 *      tags: [Exams]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: examId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the exam to update
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
 *          description: Exam schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Exam not found
 *        "500":
 *          description: Oh boi
 */
router.put('/:id', body({ content }), update)

/**
 * @swagger
 * path:
 *  api/exams/{examId}:
 *    delete:
 *      summary: Delete exam
 *      tags: [Exams]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: examId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the exam to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted exam
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Exam not found
 *        "500":
 *          description: Oh boi
 */
router.delete('/:id', destroy)

export default router
