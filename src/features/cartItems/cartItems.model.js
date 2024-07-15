import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartItemsModel {
	constructor(productID, userID, quantity, id) {
		this.productID = productID;
		this.userID = userID;
		this.quantity = quantity;
		this.id = id;
	}
	// static addToCart(productID, userID, quantity) {
	// 	// console.log(productID, userID, quantity);
	// 	// 1. validate quantity
	// 	if (quantity <= 0) {
	// 		console.log("Invalid quantity");
	// 		return "Invalid quantity";
	// 	}
	// 	// 2. validate user
	// 	const user = UserModel.getAll().find((u) => u.id == userID);
	// 	if (!user) {
	// 		return "User not found";
	// 	}
	// 	// 3. validate product
	// 	const product = ProductModel.getAll().find((p) => p.id == productID);
	// 	if (!product) {
	// 		return "Product not found";
	// 	}

	// 	const cartItemIndex = cartItems.findIndex((i) => i.productID == productID);
	// 	// console.log(cartItemIndex);
	// 	if (cartItemIndex >= 0) {
	// 		cartItems[cartItemIndex].quantity = quantity;
	// 		return `Quantity for already existing item with id - ${productID} is changed to ${quantity}.`;
	// 	} else {
	// 		const newCartItem = new CartItemsModel(productID, userID, quantity);
	// 		newCartItem.id = cartItems.length + 1;
	// 		cartItems.push(newCartItem);
	// 		return newCartItem;
	// 	}
	// }

	// static get(userID) {
	// 	const user = UserModel.getAll().find((u) => u.id == userID);
	// 	if (!user) {
	// 		return "User not found";
	// 	} else {
	// 		return cartItems.filter((i) => i.userID == userID);
	// 	}
	// }

	// static delete(cartItemID, userID) {
	// 	const cartItemIndex = cartItems.findIndex((i) => i.id == cartItemID && i.userID == userID);
	// 	if (cartItemIndex == -1) {
	// 		return "Item not found";
	// 	} else {
	// 		cartItems.splice(cartItemIndex, 1);
	// 		// return "Cart item deleted succesfully.";
	// 	}
	// }
}

// var cartItems = [
// 	constructor(userID, productID, quantity, id)
// 	new CartItemsModel(1, 2, 1, 1),
// 	new CartItemsModel(1, 1, 2, 2),
// ];
