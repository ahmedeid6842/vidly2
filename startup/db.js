const logger = require("../utils/logger")
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
module.exports = function (app) {
    mongoose.connect('mongodb+srv://ahmed:ahmed12345@cluster0.bysax.mongodb.net/vidly?retryWrites=true&w=majority')
        .then(() => {
            app.listen(port, () => console.log(`Listening on port ${port}...`));
            logger.log({
                level: "info",
                message: "connected succesfully to database"
            })
        })
}