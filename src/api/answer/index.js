import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { addAuthor } from "s/request";
import {
  create,
  index,
  show,
  update,
  destroy,
  find,
  startTimer,
  endTimer,
} from "./controller";
import { schema } from "./model";
export Answer, { schema } from "./model";

const { content } = schema.tree;
/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answer management
 */
const router = new Router();

router.post("/find", body({ ids: [String] }), find);

router.put("/start_timer/:id/", body({}), startTimer);
router.put("/end_timer/:id/", body({}), endTimer);

/**
 * @swagger
 * path:
 *  api/answers/:
 *    post:
 *      summary: Create a new Answer
 *      tags: [Answers]
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
 *          description: A answer schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Answer'
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
 *  api/answers/:
 *    get:
 *      summary: Get answers
 *      tags: [Answers]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "200":
 *          description: A answer schema array (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "500":
 *          description: Oh boi
 */
router.get("/", query(), index);

/**
 * @swagger
 * path:
 *  api/answers/{answerId}:
 *    get:
 *      summary: Get Answer
 *      tags: [Answers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the answer to get
 *      responses:
 *        "200":
 *          description: A answer schema (fields depend on the ACL)
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Answer not found
 *        "500":
 *          description: Oh boi
 */
router.get("/:id", show);

/**
 * @swagger
 * path:
 *  api/answers/{answerId}:
 *    put:
 *      summary: Update answer
 *      tags: [Answers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the answer to update
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
 *          description: Answer schema (fields depend on the ACL)
 *        "400":
 *          description: Invalid Body
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Answer not found
 *        "500":
 *          description: Oh boi
 */
router.put("/:id", body({ content }), update);

/**
 * @swagger
 * path:
 *  api/answers/{answerId}:
 *    delete:
 *      summary: Delete answer
 *      tags: [Answers]
 *      security:
 *        - jwtSessionToken: []
 *      parameters:
 *        - in: path
 *          name: answerId
 *          schema:
 *            type: string
 *          required: true
 *          description: ObjectId of the answer to delete
 *      responses:
 *        "204":
 *          description: Successfully deleted answer
 *        "403":
 *          description: Missing permissions
 *        "404":
 *          description: Answer not found
 *        "500":
 *          description: Oh boi
 */
router.delete("/:id", destroy);

export default router;
