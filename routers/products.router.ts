import { Router } from "express";
import { getProducts } from "../controllers/products.controller";

const router = Router();

router.get("/data", getProducts);

export default router;

