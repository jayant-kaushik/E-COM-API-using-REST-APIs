// Manage routs/paths to ProductController

// 1. Import express
import express from "express";
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileUpload.middleware.js";

// 2. Initialize express router
const productRouter = express.Router();

const productController = new ProductController();
// All the paths to controller methods.

// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
// productRouter.post("/rate", productController.rateProduct);
productRouter.post("/rate", (req, res, next) => {
	productController.rateProduct(req, res, next);
});

// productRouter.get("/filter", productController.filterProducts);
productRouter.get("/filter", (req, res) => {
	productController.filterProducts(req, res);
});

productRouter.get("/", (req, res) => {
	productController.getAllProducts(req, res);
});

productRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
	productController.addProduct(req, res);
});

productRouter.get("/:id", (req, res) => {
	productController.getOneProduct(req, res);
});

// productRouter.get('/filter', () => { console.log('fuck you express') });

export default productRouter;
