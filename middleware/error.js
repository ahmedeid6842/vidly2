const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
    console.log("error occured");
    logger.log({
        level: "error",
        message : err.message ,
    })
    return res.status(500).send("something failed");
}