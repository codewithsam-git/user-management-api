const db = require('../config/mysql-connection');

module.exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const query = `select * from users where id = ${userId}`;
        db.query(query, (err, result) => {
            if (err) return res.json({ message: "Something went wrong" });
            else {
                return res.status(200).json({ message: result });
            }
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}