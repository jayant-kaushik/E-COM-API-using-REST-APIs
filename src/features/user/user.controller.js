import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
	constructor() {
		this.userRepository = new UserRepository();
	}
	async signUpController(req, res) {
		try {
			const { name, email, password, type } = req.body;
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new UserModel(name, email, hashedPassword, type);
			await this.userRepository.signUp(user);
			res.status(201).send(user);
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
	async signInController(req, res, next) {
		try {
			// 1. find user by email
			const user = await this.userRepository.findByEmail(req.body.email);
			if (!user) {
				res.status(400).send("Incorrect credentials. User does not exist.");
			} else {
				// 2. compare password with hashed password
				const result = await bcrypt.compare(req.body.password, user.password);
				if (result) {
					// 3. create token
					const token = jwt.sign({ userID: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
					// 4. send token
					// sending token as a cookie
					res.cookie("jwtToken", token), { maxAge: 2 * 24 * 60 * 60 * 1000 };
					// return res.send("Login Successfully");
					return res.status(200).send(token);
				} else {
					res.status(400).send("Incorrect credentials. Incorrect password.");
				}
			}
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
}
