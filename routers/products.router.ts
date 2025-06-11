import { Router } from "express";
import { addProduct, getProductbyName, getProducts } from "../controllers/products.controller";

const router = Router();

router.get("/data", getProducts);
router.get("/:name", getProductbyName);
router.post("/add", addProduct);
export default router;

