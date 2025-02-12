const db = require('../config/mysql-connection');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(400).json({ message: "Something went wrong" });
            else {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) return res.status(400).json({ message: "Something went wrong" });
                    else {
                        const query = `insert into users (name, email, password) values ('${name}', '${email}', '${hash}')`;
                        db.query(query, (err, result) => {
                            if (err) return res.status(400).json({ message: err });
                            else {
                                // console.log(result)
                                res.status(200).json({ message: result, responseMessage: "User created successfully." })
                            }
                        });
                    }
                })
            }
        })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}