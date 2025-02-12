const jwt = require("jsonwebtoken");

const isValid = (req, res, next) => {
    if(!req.cookies.token) return res.json({message: "You are not allowed. Please Login"});
    // console.log(req.cookies.token)   
    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch {
        return res.status(400).json({ message: "Invalid User" });
    }
};

module.exports = isValid;
