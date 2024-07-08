import CartItemsModel from "./cartItems.model.js";

export default class CartItemsConstroller {
	add(req, res) {
		const { productID, quantity } = req.body;
		const userID = req.userID;
		const response = CartItemsModel.addToCart(productID, userID, quantity);
		res.status(201).send(response);
	}
	get(req, res) {
		const userID = req.userID;
		const items = CartItemsModel.get(userID);
		return res.status(200).send(items);
	}
	delete(req, res) {
		const userID = req.userID;
		const cartItemID = req.params.id;
		const error = CartItemsModel.delete(cartItemID, userID);
		if (error) {
			return res.status(404).send(error);
		} else {
			return res.status(200).send("Cart item deleted succesfully.");
		}
	}
}
