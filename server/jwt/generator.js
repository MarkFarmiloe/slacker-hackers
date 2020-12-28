const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = async (userId) => {
	const payload = {
		user: userId,
	};

	//console.log("process.env: ", process.env);
	//console.log("SECRET: ", process.env.jwtSecret);
	//console.log(dotenv);
	return await jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;

