import express from "express";
import sellersRouter from "./sellersRoutes.js"

const router = express.Router();

router.use('/sellers', sellersRouter);

export default router;
