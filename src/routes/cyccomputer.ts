import { Router } from "express";
import { GetProducts } from "../controller/cyccomputer/getProducts";

const router = Router();

router.get("/getProducts", GetProducts);

export default router;
