const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
