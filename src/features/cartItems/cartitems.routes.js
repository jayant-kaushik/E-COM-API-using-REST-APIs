// Manage routs/paths to ProductController

// 1. Import express
import express from "express";
import CartItemsConstroller from "./cartItems.controller.js";

// 2. Initialize express router
const cartRouter = express.Router();

const cartController = new CartItemsConstroller();
// All the paths to controller methods.

// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
cartRouter.post("/", cartController.add);
cartRouter.get("/", cartController.get);
cartRouter.delete("/:id", cartController.delete);

// productRouter.get('/filter', () => { console.log('fuck you express') });

export default cartRouter;
