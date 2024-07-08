// Manage routs/paths to UserController

// 1. Import express
import express from "express";
import UserController from "./user.controller.js";

// 2. Initialize express router
const userRouter = express.Router();

const userController = new UserController();
// All the paths to controller methods.

userRouter.post("/signup", (req, res) => {
	userController.signUpController(req, res);
});
userRouter.post("/signin", (req, res) => {
	userController.signInController(req, res);
});

// export the userRouter to server page.
export default userRouter;
