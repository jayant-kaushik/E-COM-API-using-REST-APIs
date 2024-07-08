import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
	// 1. read the token
	// console.log(req.headers);
	// const token = req.headers["authorization"];

	const token = req.cookies.jwtToken;

	// 2. if no token, return the error
	if (!token) {
		return res.status(401).send("Unauthorized, No token");
	}

	// 3. check if token is valid
	try {
		const payload = jwt.verify(token, "qhDjICzjii2dFQ3ld8Hej79o0sR2Tpby");
		// console.log(payload);
		req.userID = payload.userID;
	} catch {
		// 4. call the next middleware
		return res.status(401).send("Unauthorized; token not valid");
	}
	// 5. return error
	next();
};

export default jwtAuth;
