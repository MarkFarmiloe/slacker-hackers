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
	const { name, email, password, role, slackId, token } = req.body;
	const client = await Connection.connect();
	try {
		let getToken = await client.query("SELECT token FROM token WHERE id = 1");
		let tokenToBeChecked = getToken.rows[0].token;
		let result;
		
		if(role == 'mentor'){
		
			if(tokenToBeChecked == token){
				result = await client.query("SELECT * FROM mentors WHERE email = $1", [email]);
				
			}else{
				res.send('Invalid token');
			}
			
		}else if(role == 'student'){ 
			result= await client.query("SELECT * FROM trainees WHERE email = $1", [email]);
		}
		
	
		if(result.rowCount){
			res.status(401).send("User already exists");
		} else {
			let user;
			const saltRounds = 10; 
			const salt = await bcrypt.genSalt(saltRounds);
			const  encryptedPassword = await bcrypt.hash(password, salt);
			if(role == 'mentor'){
				const insertQuery = `INSERT INTO mentors (username, email, password, "slackUserId", "defaultLocationId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
				 user = await client.query(insertQuery, [ name, email, encryptedPassword, slackId, 1 ]);
			}else if(role == 'student'){
				const insertQuery = `INSERT INTO trainees (username, email, password, "slackUserId", "classId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
				user = await client.query(insertQuery, [ name, email, encryptedPassword, slackId, 1 ]);
			}
			if(user.rowCount){          
				const token = await jwtGenerator(user.rows[0].user_id);
				res.status(200).json({ token });
			} else {
				res.status(500).send("Database error trying to insert user");
			}
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} 
	finally {
		client.release();
		console.log("Pool released....");
	}
});

router.post("/login",  validate, async (req, res) => {
	const { email, password } = req.body;
	const client = await Connection.connect();
	try {
		const userMentor = await client.query("SELECT * FROM mentors WHERE email = $1", [ email]);
		const userTrainee = await client.query("SELECT * FROM trainees WHERE email = $1", [ email]);
		
		if(userMentor.rowCount)
		{
			if(userMentor.rowCount === 0){
				res.status(401).send("Password or email is incorrect");
			} else {
				const validPassword = await bcrypt.compare(password, userMentor.rows[0].password);
				if( validPassword === false ){
					res.status(401).send("Password or email is incorrect");
				} else {
					//let token = await jwtGenerator(user.rows[0].user_id);
					//const userAuth = { jwt: token, authLevel: 0 };
					//res.json({ userAuth });
					let isTheMentorAdmin = userMentor.rows[0].isadmin == 'true' ? 'admin' : 'mentor';
					res.json({
						user: userMentor.rows[0].username,
						isAdmin: userMentor.rows[0].isadmin,
						role: isTheMentorAdmin 
					});
				}
			}
		}else if(userTrainee.rowCount){
			if(userTrainee.rowCount === 0){
				res.status(401).send("Password or email is incorrect");
			} else {
				const validPassword = await bcrypt.compare(password, userTrainee.rows[0].password);
				if( validPassword === false ){
					res.status(401).send("Password or email is incorrect");
				} else {
					//let token = await jwtGenerator(user.rows[0].user_id);
					//const userAuth = { jwt: token, authLevel: 0 };
					//res.json({ userAuth });
					
					const slackId = await client.query(` SELECT "slackUserId" FROM trainees WHERE email='${email}'`);
					const slackName = await client.query(` SELECT "name" FROM slackusers WHERE "userid"='${slackId.rows[0].slackUserId}'`);

					res.json({
						user: userTrainee.rows[0].username,
						slackUserName: slackName.rows[0].name,
						userSlackId: slackId.rows[0].slackUserId,
						role: 'student'
					});
				}
			}
		}
		
		
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} 
	finally {
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