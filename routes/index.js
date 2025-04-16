import express from "express";
import sellersRouter from "./sellersRoutes.js";
import productsRouter from "./productsRoutes.js";
import ordersRouter from "./ordersRoutes.js";
import orderItemsRouter from "./orderItemsRoutes.js";
import reportsRouter from "./reportsRoutes.js";
import auth from "./authRoutes.js";

const router = express.Router();

router.use('/sellers', sellersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/orderItems', orderItemsRouter);
router.use('/reports', reportsRouter);
router.use('/auth', auth);

export default router;
