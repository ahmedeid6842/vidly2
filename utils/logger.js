const { _fillMissedErrors } = require("joi/lib/types/array");
const winston = require("winston");

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: "errors.log" })
    ]
})

module.exports = logger;