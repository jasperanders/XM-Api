import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { addAuthor } from "s/request";
import { create, index, show, update, destroy, find } from "./controller";
import { schema } from "./model";
export MultipleChoiceQuestion, { schema } from "./model";

const { content } = schema.tree;
/**
 * @swagger
 * tags:
 *   name: MultipleChoiceQuestions
 *   description: MultipleChoiceQuestion management
 */
const router = new Router();

router.get("/find", body({ ids: [String] }), find);

/**
 * @swagger
 * path:
 *  api/multiple_choice_questions/:
 *    post:
 *      summary: Create a new MultipleChoiceQuestion
 *      tags: [MultipleChoiceQuestions]
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
 *          description: A multiple_choice_question schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MultipleChoiceQuestion'
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
 *  api/multiple_choice_questions/:
 *    get:
 *      summary: Get multiple_choice_questions
 *      tags: [MultipleChoiceQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A multiple_choice_question schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get("/", query(), index);

/**
 * @swagger
 * path:
 *  api/multiple_choice_questions/{multiple_choice_questionId}:
 *    get:
 *      summary: Get MultipleChoiceQuestion
 *      tags: [MultipleChoiceQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_question to get
 *      responses:
 *        "200":
 *          description: A multiple_choice_question schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.get("/:id", show);

/**
 * @swagger
 * path:
 *  api/multiple_choice_questions/{multiple_choice_questionId}:
 *    put:
 *      summary: Update multiple_choice_question
 *      tags: [MultipleChoiceQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_question to update
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
 *          description: MultipleChoiceQuestion schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.put("/:id", body({ content }), update);

/**
 * @swagger
 * path:
 *  api/multiple_choice_questions/{multiple_choice_questionId}:
 *    delete:
 *      summary: Delete multiple_choice_question
 *      tags: [MultipleChoiceQuestions]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: multiple_choice_questionId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the multiple_choice_question to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted multiple_choice_question
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: MultipleChoiceQuestion not found
 *        "500":
 *          description: Oh boi
 */
router.delete("/:id", destroy);

export default router;
