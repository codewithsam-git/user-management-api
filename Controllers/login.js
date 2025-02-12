const db = require('../config/mysql-connection');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const query = `select * from users where email = '${email}'`;
        db.query(query, async (err, result) => {
            // console.log("result", result);
            if (err) return res.status(400).json({ message: err })
            if (result.length === 0) return res.status(400).json({ message: "Invalid Data" })

            bcrypt.compare(password, result[0].password, (err, result) => {
                if (err) return res.status(400).json({ message: "Something went wrong" });
                if (result) {
                    let token = jwt.sign({ email: email }, process.env.JWT_KEY)
                    res.cookie("token", token);
                    // console.log(token);
                    return res.status(200).json({ message: result, responseMessage: "Logged In Successfully.", "token": token })
                }
                else {
                    return res.status(400).json({ message: result, responseMessage: "Logged In Failed." })
                }
            });
        });

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}