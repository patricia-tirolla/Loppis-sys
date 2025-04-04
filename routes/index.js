import express from "express";
import sellersRouter from "./sellersRoutes.js";
import productsRouter from "./productsRoutes.js";
import ordersRouter from "./ordersRoutes.js";
import orderItemsRouter from "./orderItemsRoutes.js";

const router = express.Router();

router.use('/sellers', sellersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/orderItems', orderItemsRouter);

export default router;
