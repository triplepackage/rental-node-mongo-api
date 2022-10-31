const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.verify = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        jwt.verify(authorization.split(" ")[1], process.env.TOKEN_SECRET);
        next();
    } catch (e) {
        res.status(401).send();
    }
};
