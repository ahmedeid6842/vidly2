require("express-async-errors");
const logger = require("../utils/logger");

module.exports = function () {
    process.on("uncaughtException", (ex) => {
        console.log(ex)
        logger.log({
            level: "error",
            message: ex.message
        })
        process.exit()
    })

}