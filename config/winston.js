const winston = require("winston");
const path = require("path");

const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: "debug",
            colorize: true,
            showLevel: true
        }),
        new winston.transports.File({
            level: "info",
            filename: path.join(path.resolve(__dirname, ".."), "info.log")
        })
    ],
    exitOnError: false
};

const logger = winston.createLogger(logConfiguration);

logger.stream = {
    write(message) {
        logger.info(message);
    }
};

module.exports = logger;
