const logger = require("../utils/logger")
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
module.exports = function (app) {
    mongoose.connect('mongodb://127.0.0.1:27017/relationships')
        .then(() => {
            app.listen(port, () => console.log(`Listening on port ${port}...`));
            logger.log({
                level: "info",
                message: "connected succesfully to database"
            })
        })
}