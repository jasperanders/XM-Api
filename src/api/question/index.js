import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { addAuthor } from "s/request";
import { create, index, show, update, destroy, find } from "./controller";
import { schema } from "./model";
export Question, { schema } from "./model";

const { content } = schema.tree;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management
 */
const router = new Router();

router.post("/find", body({ ids: [String] }), find);

/**
 * @swagger
 * path:
 *  api/questions/:
 *    post:
 *      summary: Create a new Question
 *      tags: [Questions]
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
 *          description: A question schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Question'
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.post(
  "/",
  body({
    content,
  }),
  addAuthor({ required: false, addBody: true }),
  create
);

// TODO: Pagination docs
/**
 * @swagger
 * path:
 *  api/questions/:
 *    get:
 *      summary: Get questions
 *      tags: [Questions]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A question schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get("/", query(), index);

/**
 * @swagger
 * path:
 *  api/questions/{questionId}:
 *    get:
 *      summary: Get Question
 *      tags: [Questions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the question to get
 *      responses:
 *        "200":
 *          description: A question schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Question not found
 *        "500":
 *          description: Oh boi
 */
router.get("/:id", show);

/**
 * @swagger
 * path:
 *  api/questions/{questionId}:
 *    put:
 *      summary: Update question
 *      tags: [Questions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the question to update
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
 *          description: Question schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Question not found
 *        "500":
 *          description: Oh boi
 */
router.put("/:id", body({ content }), update);

/**
 * @swagger
 * path:
 *  api/questions/{questionId}:
 *    delete:
 *      summary: Delete question
 *      tags: [Questions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the question to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted question
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Question not found
 *        "500":
 *          description: Oh boi
 */
router.delete("/:id", destroy);

export default router;
