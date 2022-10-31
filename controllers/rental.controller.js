const moment = require("moment");
const rentalService = require("../services/rental.service");

exports.getRentalsByCity = async (req, res) => {
    try {
        const { cityName } = req.params;
        const data = await rentalService.getRentalsByCity(cityName);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).end();
    }
};

exports.getRentalByStreetName = async (req, res) => {
    try {
        const { streetName } = req.params;
        const data = await rentalService.getRentalByStreetName(streetName);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).end();
    }
};

exports.getRental = async (req, res) => {
    try {
        const { rentalId } = req.params;
        const data = await rentalService.getRental(rentalId);

        if (data.length === 0) {
            res.status(404).end();
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).end();
    }
};

exports.updateRentalExpirationDate = async (req, res) => {
    const { rentalId, expirationDate } = req.body;

    if (!moment(expirationDate).isValid()) {
        res.status(400).send("Invalid expiration date");
    }

    try {
        await rentalService.updateRental(rentalId, expirationDate);
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
    }
};

exports.getRentalCountByCity = async (req, res) => {
    try {
        const data = await rentalService.getRentalCountByCity();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).end();
    }
};

exports.getRentalCountByRecordStatus = async (req, res) => {
    try {
        const data = await rentalService.getRentalCountByRecordStatus();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).end();
    }
};

exports.getRentalCountByExpirationDate = async (req, res) => {
    try {
        const data = await rentalService.getRentalCountByExpirationDate();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).end();
    }
};
