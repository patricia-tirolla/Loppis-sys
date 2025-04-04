import express from "express";
import ordersRepo from "../repo/orders.js";
import orderItemsRepo from "../repo/orderItems.js";

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
    const orderId = req.params.orderId;
    const newOrder = ordersRepo.addOrder(orderId);

    if (!newOrder) {
        return res.status(404).send({ message: "Order not added" });
    }
    res.location(`/orders/${newOrder}`).sendStatus(200);
});

// ADD new order item
router.put('/:orderId/orderItem/:productId', (req, res) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const orderItem = orderItemsRepo.addOrderItem(orderId, productId);

    if (!orderItem) {
        return res.status(404).send({ message: "Order item not added." });
    }
    res.location(`/orderItems/${orderItem}`).sendStatus(201);
});

export default router;

