const router = require("express").Router();
const rentalController = require("../controllers/rental.controller");

/**
 * @swagger
 * tags:
 *  name: Rentals
 *  description: Basic operations to query rental data
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/city/{cityName}:
 *   get:
 *     summary: Retrieves rental properties by city
 *     parameters:
 *      - in: path
 *        name: cityName
 *        description: City or Town
 *        tags: [Rentals]
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Rental properties located in specified city
 *       401:
 *         description: Unauthorized
 */
router.get("/city/:cityName", rentalController.getRentalsByCity);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/street/{streetName}:
 *   get:
 *     description: Retrieves rental properties by street name
 *     parameters:
 *      - name: streetName
 *        description: Street name
 *        in: path
 *        required: true
 *        type: string
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Rental properties having specified street name
 *       401:
 *         description: Unauthorized
 */
router.get("/street/:streetName", rentalController.getRentalByStreetName);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/{rentalId}:
 *   get:
 *     description: Retrieves rental properties by rental id
 *     parameters:
 *      - name: rentalId
 *        description: Rental id
 *        in: path
 *        required: true
 *        type: int
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: rental properties
 *       401:
 *         description: Unauthorized
 */
router.get("/:rentalId", rentalController.getRental);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental:
 *   put:
 *     summary: Updates expiration date for rental property
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      rentalId:
 *                          type: string
 *                      expirationDate:
 *                          type: string
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: rental properties
 *       401:
 *         description: Unauthorized
 */
router.put("/", rentalController.updateRentalExpirationDate);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/groupedby/city:
 *   get:
 *     description: Retrieves rental count by city
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Count of rental properties by city
 *       401:
 *         description: Unauthorized
 */
router.get("/groupedby/city", rentalController.getRentalCountByCity);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/groupedby/recordstatus:
 *   get:
 *     description: Retrieves rental count by record status
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Count of rental properties by record status
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/groupedby/recordstatus",
    rentalController.getRentalCountByRecordStatus
);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * /rental/groupedby/expirationdate:
 *   get:
 *     description: Retrieves rental count by expiration date
 *     produces:
 *      - application/json
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Count of rental properties by expiration date
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/groupedby/expirationdate",
    rentalController.getRentalCountByExpirationDate
);

module.exports = router;
