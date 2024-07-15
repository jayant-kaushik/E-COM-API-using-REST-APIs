import { ApplicationError } from "../../error-handler/applicationError.js";
import CartItemsModel from "./cartItems.model.js";
import CartItemsRepository from "./cartitems.repository.js";

export default class CartItemsConstroller {
	constructor() {
		this.cartItemsRepository = new CartItemsRepository();
	}

	async add(req, res) {
		try {
			const { productID, quantity } = req.body;
			const userID = req.userID;
			await this.cartItemsRepository.add(productID, userID, quantity);
			res.status(201).send("Cart is updated.");
		} catch (err) {
			console.log(err);
			throw new ApplicationError("Something went wrong", 500);
		}
	}
	async get(req, res) {
		const userID = req.userID;
		const items = await this.cartItemsRepository.get(userID);
		return res.status(200).send(items);
	}
	async delete(req, res) {
		const userID = req.userID;
		const cartItemID = req.params.id;
		const isDeleted = await this.cartItemsRepository.delete(userID, cartItemID);
		if (!isDeleted) {
			return res.status(404).send("item not found.");
		} else {
			return res.status(200).send("Cart item deleted succesfully.");
		}
	}
}
