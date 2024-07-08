import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
	constructor() {
		this.collection = "users";
	}
	async signUp(newUser) {
		try {
			// 1. get the database
			const db = getDB();
			// 2. get the collection
			const collection = db.collection(this.collection);
			// 3. insert the document
			await collection.insertOne(newUser);
			return newUser;
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
	async signIn(email, password) {
		try {
			// 1. get the database
			const db = getDB();
			// 2. get the collection
			const collection = db.collection(this.collection);
			// 3. find the document
			return await collection.findOne({ email, password });
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
	async findByEmail(email) {
		try {
			// 1. get the database
			const db = getDB();
			// 2. get the collection
			const collection = db.collection("users");
			// 3. find the document
			return await collection.findOne({ email });
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
}

export default UserRepository;
