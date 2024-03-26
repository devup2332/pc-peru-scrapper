import { Router } from "express";
import { GetProductsRipleyController } from "../controller/ripley/getPorductsRipleyController";
import { SearchProducts } from "../controller/ripley/searchProducts";

const router = Router();

router.get("/getProducts", GetProductsRipleyController);
router.get("/searchProducts", SearchProducts);

export default router;
