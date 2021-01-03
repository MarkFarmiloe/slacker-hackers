const router = require("express").Router();
import { Connection } from "../db";
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation,  async (req, res) => {
		const client = await Connection.connect();
        try {
            const user = await client.query("SELECT * FROM users WHERE user_id = $1", [ req.user ]);
            res.json(user.rows[0].username);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");   
        } finally {
			client.release();
			console.log("Pool released....");
		}
});

module.exports = router;