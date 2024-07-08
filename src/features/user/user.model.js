import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
	constructor(name, email, password, type, id) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
		this._id = id;
	}
	// static async signUpModel(name, email, password, type) {
	// 	try {
	// 		// 1. get the database
	// 		const db = getDB();
	// 		// 2. get the collection
	// 		const collection = db.collection("users");

	// 		const newUser = new UserModel(name, email, password, type);
	// 		// comment: - while working with local data
	// 		// newUser.id = users.length + 1;
	// 		// users.push(newUser);

	// 		// comment: - while working with mongodb
	// 		// 3. insert the document
	// 		await collection.insertOne(newUser);
	// 		return newUser;
	// 	} catch (err) {
	// 		throw new ApplicationError("Something went wrong", 500);
	// 	}
	// }

	// static signInModel(email, password) {
	// 	const user = users.find((u) => u.email == email && u.password == password);
	// 	return user;
	// }

	static getAll() {
		return users;
	}
}

let users = [
	{
		id: 1,
		name: "seller user",
		email: "seller@ecom.com",
		password: "Password1",
		type: "seller",
	},
	{
		id: 2,
		name: "customer user",
		email: "customer@ecom.com",
		password: "Password2",
		type: "customer",
	},
];
