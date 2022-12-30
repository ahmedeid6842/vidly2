const express = require('express');
const app = express();
app.use(express.json());

require("./startup/loggin")();
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/prod")(app);

// throw new Error("somthing went wrong");




