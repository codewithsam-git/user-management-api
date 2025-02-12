const db = require('../config/mysql-connection');

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const query = `select * from users where id = ${userId}`;
        db.query(query, (err, result) => {
            if (err) return res.json({ message: "Something went wrong" });
            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const query1 = `delete from users WHERE id = ${userId}`;
            db.query(query1, (err, result) => {
                if (err) return res.status(500).json({ message: err });
                return res.status(200).json({ message: result, responseMessage: "User deleted successfully." });
            })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}