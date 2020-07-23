import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { addAuthor } from "s/request";
import { create, index, show, update, destroy, find } from "./controller";
import { schema } from "./model";
export FreeTextQuestion, { schema } from "./model";

const { content } = schema.tree;
/**
 * @swagger
 * tags:
 *   name: FreeTextQuestions
 *   description: FreeTextQuestion management
 */
const router = new Router();

router.post("/find", body({ ids: [String] }), find);

/**
 * @swagger
 * path:
 *  api/free_text_questions/:
 *    post:
 *      summary: Create a new FreeTextQuestion
 *      tags: [FreeTextQuestions]
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
 *          description: A free_text_question schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FreeTextQuestion'
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
 *  api/free_text_questions/:
 *    get:
 *      summary: Get free_text_questions
 *      tags: [FreeTextQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A free_text_question schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get("/", query(), index);

/**
 * @swagger
 * path:
 *  api/free_text_questions/{free_text_questionId}:
 *    get:
 *      summary: Get FreeTextQuestion
 *      tags: [FreeTextQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_question to get
 *      responses:
 *        "200":
 *          description: A free_text_question schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.get("/:id", show);

/**
 * @swagger
 * path:
 *  api/free_text_questions/{free_text_questionId}:
 *    put:
 *      summary: Update free_text_question
 *      tags: [FreeTextQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_question to update
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
 *          description: FreeTextQuestion schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.put("/:id", body({ content }), update);

/**
 * @swagger
 * path:
 *  api/free_text_questions/{free_text_questionId}:
 *    delete:
 *      summary: Delete free_text_question
 *      tags: [FreeTextQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: free_text_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the free_text_question to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted free_text_question
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: FreeTextQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.delete("/:id", destroy);

export default router;
