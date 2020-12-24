const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = async (userId) => {
	const payload = {
		user: userId,
	};

	return await jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;

