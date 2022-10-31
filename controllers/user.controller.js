const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const users = require("../models/user");

dotenv.config();

exports.authenticate = async (req, res) => {
    const { username, password } = req.body;

    const result = await users.find({ username, password });
    if (result.length > 0) {
        const payload = { user: username };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "3600s"
        });

        res.status(200).send({ auth: true, token });
    } else {
        res.status(401).end();
    }
};
