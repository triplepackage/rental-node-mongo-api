const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const { verify } = require("./middleware/security");
const logger = require("./config/winston");

dotenv.config();
const rental = require("./routes/rental.route");
const user = require("./routes/user.route");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("combined", { immediate: true, stream: logger.stream }));

app.use("/rental", verify, rental);
app.use("/user", user);

const swaggerDocs = swaggerJsDoc({
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Baltimore County Rental Database API",
            version: "1.0.0",
            description:
                "This is a REST API that provides access to the Baltimore County Rental Database"
        }
    },
    components: {
        securitySchemes: {
            jwt: {
                type: "http",
                scheme: "bearer",
                in: "header"
            }
        }
    },
    apis: ["routes/user.route.js", "routes/rental.route.js"],
    swagger: "2.0"
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

try {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    logger.info("Connected to database");
    app.listen(process.env.PORT, () => {
        logger.info(`App listening at http://localhost:${process.env.PORT}`);
    });
} catch (err) {
    logger.error(`An error has occurred. ${err}`);
}

module.exports = app;
