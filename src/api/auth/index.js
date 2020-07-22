import { Router } from "express";
import { middleware as body } from "bodymen";
import {
  authenticate,
  providerAuthenticate,
  logout,
  logoutAll,
} from "./controller";
import { masterman, doorman } from "~/services/auth";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authenticate a user
 */
const router = new Router();

/**
 * @swagger
 * path:
 *  /api/auth/:
 *    post:
 *      summary: Login
 *      tags: [Authentication]
 *      security:
 *        - masterKey: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  role:
 *                    type: string
 *                  token:
 *                    type: string
 *        "400":
 *          description: Invalid Body
 *        "401":
 *          description: Missing masterkey
 *        "403":
 *          description: Missing permissions (user or password wrong or user is not verified)
 *        "500":
 *          description: Oh boi
 */
router.post(
  "",
  masterman(),
  //   body({
  //     email: {
  //       type: String,
  //     },
  //     password: {
  //       type: String,
  //       required: true,
  //     },
  //   }),
  authenticate
);

/**
 * @swagger
 * path:
 *  /api/auth/logout:
 *    post:
 *      summary: Logout the current session
 *      tags: [Authentication]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "204":
 *          description: Success
 *        "400":
 *          description: Token missing
 *        "500":
 *          description: Oh boi
 */
router.post("/logout", logout);

/**
 * @swagger
 * path:
 *  /api/auth/logout/all:
 *    post:
 *      summary: Logout all sessions which are associated with the user
 *      tags: [Authentication]
 *      security:
 *        - jwtSessionToken: []
 *      responses:
 *        "204":
 *          description: Success
 *        "400":
 *          description: Token missing
 *        "500":
 *          description: Oh boi
 */
router.post("/logout/all", logoutAll);

/**
 * @swagger
 * path:
 *  /api/auth/{provider}:
 *    post:
 *      summary: Login with 3rd party
 *      tags: [Authentication]
 *      parameters:
 *        - in: path
 *          name: provider
 *          schema:
 *            type: string
 *            enum: [facebook, google]
 *          required: true
 *          description: 3rd party provider name
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  role:
 *                    type: string
 *                  token:
 *                    type: string
 *        "400":
 *          description: Invalid Body
 *        "401":
 *          description: Missing masterkey
 *        "403":
 *          description: Missing permissions (user or password wrong or user is not verified)
 *        "500":
 *          description: Oh boi
 */
router.post(
  "/:provider",
  body({
    token: {
      type: String,
      required: true,
    },
  }),
  providerAuthenticate
);

export default router;
