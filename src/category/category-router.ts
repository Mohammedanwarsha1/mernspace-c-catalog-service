import express from "express";
import categoryValidator from "./category-validator";
import { CategoryController } from "./category-controller";

const router = express.Router();

const categoryController = new CategoryController();

router.post("/", categoryValidator, categoryController.create);

export default router;
