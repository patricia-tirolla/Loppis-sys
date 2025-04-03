import express from "express";
import sellersRouter from "./sellersRoutes.js";
import productsRouter from "./productsRoutes.js";
import ordersRouter from "./ordersRoutes.js"

const router = express.Router();

router.use('/sellers', sellersRouter);
router.use('/', productsRouter);
router.use('/orders', ordersRouter)

export default router;
