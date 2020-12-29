const router = require("express").Router();
import { Connection } from "../db";
import bcrypt from "bcrypt";
const jwtGenerator = require("../jwt/generator");
const validate = require("../middleware/validate");
//const authorisation = require("../middleware/authorisation");

/*
 *
 */

router.post("/signup",  validate, async (req, res) => {
	const { name, email, password } = req.body;
	const client = await Connection.connect();
	try {
		const result = await client.query("SELECT * FROM users WHERE email = $1", [ email]);

		if(result.rowCount){
			res.status(401).send("User already exists");
		} else {
			const saltRounds = 10, salt = await bcrypt.genSalt(saltRounds);
			const  encryptedPassword = await bcrypt.hash(password, salt);
			const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
			const user = await client.query(insertQuery, [ name, email, encryptedPassword ]);
			if(user.rowCount){
				const token = await jwtGenerator(user.rows[0].user_id);
				res.json({ token });
			} else {
				res.status(500).send("Database error trying to insert user");
			}
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} finally {
		client.release();
		console.log("Pool released....");
	}
});

router.post("/login",  validate, async (req, res) => {
	const { email, password } = req.body;
	const client = await Connection.connect();
	try {
		const user = await client.query("SELECT * FROM users WHERE email = $1", [ email]);

		if(user.rowCount === 0){
			res.status(401).send("Password or email is incorrect");
		} else {
			const validPassword = await bcrypt.compare(password, user.rows[0].password);
			if( validPassword === false ){
				res.status(401).send("Password or email is incorrect");
			} else {
				//let token = await jwtGenerator(user.rows[0].user_id);
				//const userAuth = { jwt: token, authLevel: 0 };
				//res.json({ userAuth });
				res.json({user: user.rows[0].username});
			}
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} finally {
		client.release();
		console.log("Pool released....");
	}
});

/* router.get("/verify",  authorisation, (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
}); */

module.exports = router;