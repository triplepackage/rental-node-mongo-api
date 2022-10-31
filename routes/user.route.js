const router = require("express").Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * /user/authenticate:
 *   post:
 *     summary: Authenticates API user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *
 */
router.post("/authenticate", userController.authenticate);

module.exports = router;
