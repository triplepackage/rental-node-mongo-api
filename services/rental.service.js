const dotenv = require("dotenv");
const moment = require("moment");
const rentalProperty = require("../models/rentalProperty");

dotenv.config();

/**
 * Returns rental records based on city name
 * @param city
 * @returns {Promise<*>}
 */
exports.getRentalsByCity = async (city) => await rentalProperty.find({ city });

/**
 * Returns rental records based on street name
 * @param streetName
 * @returns {Promise<*>}
 */
exports.getRentalByStreetName = async (streetName) =>
    await rentalProperty.find({ streetName });

/**
 * Returns rental count by city
 * @returns {Promise<*>}
 */
exports.getRentalCountByCity = async () =>
    await rentalProperty.aggregate([
        {
            $sort: { city: 1 }
        },
        {
            $group: {
                _id: { city: "$city" },
                count: { $sum: 1 }
            }
        }
    ]);

/**
 * Returns rental count by status
 * @returns {Promise<*>}
 */
exports.getRentalCountByRecordStatus = async () =>
    await rentalProperty.aggregate([
        {
            $sort: { status: 1 }
        },
        {
            $group: {
                _id: { status: "$status" },
                count: { $sum: 1 }
            }
        }
    ]);

/**
 * Returns rental count by license expiration date
 * @returns {Promise<*>}
 */
exports.getRentalCountByExpirationDate = async () =>
    await rentalProperty.aggregate([
        {
            $project: {
                date: {
                    $toDate: "$expirationDate"
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { date: "$date", format: "%Y-%m-%d" } },
                count: { $sum: 1 }
            }
        }
    ]);

/**
 * Returns rental records based on id
 * @param rentalId
 * @returns {Promise<*>}
 */
exports.getRental = async (rentalId) =>
    await rentalProperty.findOne({ rentalId });

/**
 * Updates the expiration date for a rental property.
 * @param rentalId
 * @param expirationDate
 * @returns {Promise<*>}
 */
exports.updateRental = async (rentalId, expirationDate) => {
    const newExpirationDate = moment(expirationDate);
    if (newExpirationDate.isValid()) {
        const result = await rentalProperty.updateOne(
            { rentalId },
            {
                $set: {
                    expirationDate: newExpirationDate.valueOf()
                }
            }
        );
        return result.modifiedCount;
    }
    throw new Error(
        `The expirationDate provided, ${expirationDate}, is invalid.`
    );
};
