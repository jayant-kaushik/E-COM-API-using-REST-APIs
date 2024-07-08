import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
	constructor() {
		this.collection = "products";
	}
	async add(newProduct) {
		try {
			// 1. get the database
			const db = getDB();
			// 2. get the collection
			const collection = db.collection(this.collection);
			// 3. insert the document
			await collection.insertOne(newProduct);
			return newProduct;
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}

	async getAll() {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			const products = await collection.find().toArray();
			console.log(products);
			return products;
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}

	async get(id) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			return await collection.findOne({ _id: new ObjectId(id) });
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}

	async filter(minPrice, maxPrice, category) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			let fitlterExpression = {};
			if (minPrice) {
				fitlterExpression.price = { $gte: parseFloat(minPrice) };
			}
			if (maxPrice) {
				fitlterExpression.price = { ...fitlterExpression.price, $lte: parseFloat(maxPrice) };
			}
			if (category) {
				fitlterExpression.category = category;
			}
			return await collection.find(fitlterExpression).toArray();
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}

	rate(userID, productID, rating) {
		try {
			const db = getDB();
			const collection = db.collection(this.collection);
			collection.updateOne({ _id: new ObjectId(productID) }, { $push: { ratings: { userID: new ObjectId(userID), rating } } });
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
}

export default ProductRepository;
