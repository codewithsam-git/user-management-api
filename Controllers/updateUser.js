const db = require('../config/mysql-connection');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    try {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(400).json({ message: "Something went wrong" });
            else {

                const query = `select * from users where id = ${userId}`;
                db.query(query, (err, result) => {
                    if (err) return res.json({ message: "Something went wrong" });
                    if (result.length === 0) {
                        return res.status(404).json({ message: "User not found" });
                    }

                    bcrypt.compare(password, result[0].password, (err, result) => {
                        if (err) return res.status(400).json({ message: "All fields are required" });
                        // console.log("Result", result);
                        if (!result) {
                            bcrypt.hash(password, salt, function (err, hash) {
                                if (err) return res.status(400).json({ message: "Something went wrong" });
                                else {
                                    const query = `update users set name = '${name}', email = '${email}', password = '${hash}' where id = ${userId}`;
                                    db.query(query, async (err, result) => {
                                        if (err) return res.json({ message: "Something went wrong" });
                                        else {
                                            // console.log(result);
                                            res.status(200).json({ message: result, responseMessage: "User updated successfully." })
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            const query = `update users set name = '${name}', email = '${email}' where id = ${userId}`;
                            db.query(query, async (err, result) => {
                                if (err) return res.json({ message: "Something went wrong" });
                                else {
                                    // console.log(result);
                                    res.status(200).json({ message: result, responseMessage: "User updated successfully." })
                                }
                            })
                        }
                    });
                })
            }
        })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}