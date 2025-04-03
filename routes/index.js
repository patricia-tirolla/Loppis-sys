import express from "express";
import sellersRouter from "./sellersRoutes.js";
import productsRouter from "./productsRoutes.js";

const router = express.Router();

router.use('/sellers', sellersRouter);
router.use('/products', productsRouter);

export default router;
