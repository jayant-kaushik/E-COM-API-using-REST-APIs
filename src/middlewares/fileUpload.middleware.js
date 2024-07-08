// 1. Import multer
import multer from "multer";

// 2. Configure storage with filename and location
const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		const name = new Date().toISOString() + "-" + file.originalname;
		cb(null, name);
	},
});

export const uploadFile = multer({
	storage: storageConfig,
});
