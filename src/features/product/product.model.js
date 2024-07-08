import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
	constructor(name, desc, price, imageUrl, category, sizes, id) {
		this.name = name;
		this.desc = desc;
		this.price = price;
		this.imageUrl = imageUrl;
		this.category = category;
		this.sizes = sizes;
		this._id = id;
	}

	// 	static get(id) {
	// 		const product = products.find((p) => p.id == id);
	// 		return product;
	// 	}

	// 	static add(product) {
	// 		product.id = products.length + 1;
	// 		products.push(product);
	// 		return product;
	// 	}

	// 	static getAll() {
	// 		return products;
	// 	}

	// 	static filter(minPrice, maxPrice, category) {
	// 		const result = products.filter((product) => {
	// 			return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category == category);
	// 		});
	// 		// console.log(result);
	// 		return result;
	// 	}

	// 	static rateProduct(userID, productID, rating) {
	// 		// 1. validate rating
	// 		if (rating < 0 || rating > 5) {
	// 			return "Invalid rating";
	// 		}
	// 		// 2. validate user
	// 		const user = UserModel.getAll().find((u) => u.id == userID);
	// 		if (!user) {
	// 			// user-defined error
	// 			throw new ApplicationError("User not found", 404);
	// 		}

	// 		// 3. validate product
	// 		const product = products.find((p) => p.id == productID);
	// 		if (!product) {
	// 			throw new ApplicationError("Product not found", 400);
	// 		}

	// 		// 4. check if there is ratings array and if not then add  ratings array
	// 		// rating array will consists rating given by each user
	// 		if (!product.ratings) {
	// 			product.ratings = [];
	// 			product.ratings.push({ userID: userID, rating: rating });
	// 		} else {
	// 			// ratings array is available; Check if rating is available against the given user
	// 			const existingRatingIndex = product.ratings.findIndex((r) => r.userID == userID);
	// 			if (existingRatingIndex >= 0) {
	// 				product.ratings[existingRatingIndex] = { userID: userID, rating: rating };
	// 			} else {
	// 				// ratings array is available; if rating not exist against the given user, push the new rating
	// 				product.ratings.push({ userID: userID, rating: rating });
	// 			}
	// 		}
	// 	}
}

// var products = [
// 	new ProductModel(
// 		1,
// 		"Product 1",
// 		"Description for Product 1",
// 		19.0,
// 		"https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
// 		"Category1"
// 	),
// 	new ProductModel(
// 		2,
// 		"Product 2",
// 		"Description for Product 2",
// 		29.99,
// 		"https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
// 		"Category2",
// 		["S", "M", "L"]
// 	),
// 	new ProductModel(
// 		3,
// 		"Product 3",
// 		"Description for Product 3",
// 		39.99,
// 		"https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
// 		"Category3",
// 		["S", "M", "XL", "XXL"]
// 	),
// ];
