module.exports = async (req, res, next) => {
	const { name, email, password } = req.body;
	const isValidEmail = (email) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	};

	if( req.path === "/signup" ){
		if( ![ name, email, password ].every(Boolean) ){
			return res.status(401).send("Missing Credentials");
		} else if( !isValidEmail(email)){
			return res.status(401).send("Invalid email");
		}
	} else if( req.path === "/login" ){
		if( ![ email, password ].every(Boolean) ){
			return res.status(401).send("Missing Credentials");
		} else if( !isValidEmail(email)){
			return res.status(401).send("Invalid email");
		}
	}
	next();  // All is OK, move to /signup or /login route....
};