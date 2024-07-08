import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
	constructor() {
		this.productRepository = new ProductRepository();
	}
	async getAllProducts(req, res) {
		try {
			const products = await this.productRepository.getAll();
			res.status(200).send(products);
		} catch (err) {
			console.log(err);
			return res.status(404).send("Something went wrong");
		}
	}

	async addProduct(req, res) {
		try {
			const { name, price, sizes, desc } = req.body;
			// constructor(name, desc, price, imageUrl, category, sizes, id)
			const newProduct = new ProductModel(name, desc, parseFloat(price), req.file.filename, null, sizes.split(","));
			const createRecord = await this.productRepository.add(newProduct);
			res.status(201).send(createRecord);
		} catch (err) {
			console.log(err);
			return res.status(404).send("Something went wrong");
		}
	}

	async rateProduct(req, res, next) {
		// console.log(req.query);
		try {
			const userID = req.userID;
			const productID = req.query.productID;
			const rating = req.query.rating;
			await this.productRepository.rate(userID, productID, rating);
			res.status(200).send("Rating has been added");
		} catch (err) {
			console.log(err);
			console.log("passing error to middleware.");
			next(err);
		}
	}
	async getOneProduct(req, res) {
		try {
			let id = req.params.id;
			const product = await this.productRepository.get(id);
			if (!product) {
				return res.status(404).send("Product not found");
			} else {
				return res.status(200).send(product);
			}
		} catch (err) {
			console.log(err);
			return res.status(404).send("Something went wrong");
		}
	}

	async filterProducts(req, res) {
		try {
			// console.log(req.query);
			const minPrice = req.query.minPrice;
			const maxPrice = req.query.maxPrice;
			const category = req.query.category;
			// console.log(minPrice, maxPrice, category);
			const result = await this.productRepository.filter(minPrice, maxPrice, category);
			res.status(200).send(result);
		} catch (err) {
			console.log(err);
			return res.status(404).send("Something went wrong");
		}
	}
}
