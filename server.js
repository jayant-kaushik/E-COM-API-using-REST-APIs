// 1. Import express modules
// npm modules
import './env.js';
import express from "express";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";
import cors from "cors";

// local modules
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartitems.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware, { logger } from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";

// To import swagger json
// Using Experimental JSON Modules (Node.js 17+)
// import apiDocs from "./swagger3.json" assert { type: "json" };

// Using import (ES Modules) without assert
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const apiDocs = require("./swagger3.json");

// 2. Create server
const server = express();

// CORS policy configuration
var corsOptions = { origin: "http://127.0.0.1:5500" };
server.use(cors(corsOptions));

// server.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:5500");
// 	res.header("Access-Control-Allow-Headers", "*");
// 	res.header("Access-Control-Allow-Methods", "*");
// 	if (req.method == "OPTIONS") {
// 		res.sendStatus(200);
// 	}
// 	next();
// });

// a middleware that parse all the json data and put it in the req.body
// server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

// For all requests related to product, redirect to product routs.
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

// 3. Get method to call defaultHandler
server.get("/", (req, res) => {
	res.send("Welcome to the ECommerce APIs");
});

// Error handler middleware
server.use((err, req, res, next) => {
	// console.log(err);
	if (err instanceof ApplicationError) {
		const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${req.originalUrl} error msg: ${err.message}`;
		logger.error(error_to_log);
		res.status(err.code).send(err.message);
	} else {
		// server errors
		const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${req.originalUrl} error msg: ${err.message}`;
		logger.error(error_to_log);
		res.status(500).send("Something went wrong. Please try again later.");
	}
});

// 4. Middleware to handle 404 requests
server.use((req, res) => {
	res.status(404).send("API not found. Please check our documentation for information at localhost:3500/api-docs");
});

// 5. Initiate the server by specifying the port no.
const port = 3500;
server.listen(port, () => {
	connectToMongoDB();
	console.log(`Server is listening at port ${port}`);
});
