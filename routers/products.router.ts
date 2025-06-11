import { Router } from "express";
import { getProductbyName, getProducts } from "../controllers/products.controller";

const router = Router();

router.get("/data", getProducts);
router.get("/:name", getProductbyName)

export default router;

