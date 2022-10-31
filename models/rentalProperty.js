const mongoose = require("mongoose");

const rentalPropertySchema = new mongoose.Schema(
    {
        rentalId: { type: String, required: true },
        streetNumber: { type: Number, required: true },
        streetName: { type: String, required: true },
        streetSuffix: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        issueDate: { type: Number, required: true },
        expirationDate: { type: Number, required: true }
    },
    { timestamps: true }
);

const RentalProperty = mongoose.model("rentalProperties", rentalPropertySchema);

module.exports = RentalProperty;
