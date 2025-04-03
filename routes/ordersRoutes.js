import express from "express";
import ordersRepo from "../repo/orders.js";

const router = express.Router();

// GET all orders
router.get('/all', (req, res) => {
    res.send(ordersRepo.getAllOrders());
});

// GET specific order
router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const order = ordersRepo.getSpecificOrder(orderId);

    if (!order) {
        return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
});

// ADD new order
router.put('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const newOrder = ordersRepo.addOrder(orderId);

    if (!newOrder) {
        return res.status(404).send({ message: "Order not added" });
    }
    res.status(200).send(newOrder);
});

export default router;