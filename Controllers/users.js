const db = require('../config/mysql-connection');

module.exports.users = async (req, res) => {
    try {
        const query = 'select * from users';
        db.query(query, async (err, result) => {
            if (err) return res.json({ message: "Something went wrong" });
            else {
                // console.log(result);
                return res.status(200).json({ message: result });
            }
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}