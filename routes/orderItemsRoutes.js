import express from "express";
import orderItemsRepo from "../repo/orderItems.js";

const router = express.Router();

// GET all order items
router.get('/orderItems/all', (req, res) => {
    res.send(orderItemsRepo.getAllOrderItems());
});

// GET specific order item
router.get('/orderItems/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const orderItem = orderItemsRepo.getSpecificOrderItem(orderItemId);

    if (!orderItem) {
        return res.status(404).send({ message: "order item not found" });
    }
    res.send(orderItem);
});

// ADD new order item
router.put('/orders/:orderId/orderItem/:productId', (req, res) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const orderItem = orderItemsRepo.addOrderItem(orderId, productId);

    if (!orderItem) {
        return res.status(404).send({ message: "Order item not added." });
    }
    res.status(201).send(orderItem);
});

// DELETE order item
router.delete('/orderItems/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const deletedOrderItem = orderItemsRepo.deledeOrderItem(orderItemId);

    if (!deletedOrderItem) {
        return res.status(404).send({ message: "Order item not deleted." });
    }
    res.send(deletedOrderItem);
});

export default router;