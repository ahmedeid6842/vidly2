const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("no token provided");
    try {
        let {error,decode} = jwt.verify(token, "secret");
        if (!error) return res.status(400).send("invalid token provided");

        req.user = decode;
        next();
    } catch (err) {
        return res.send(err.message);
    }
}