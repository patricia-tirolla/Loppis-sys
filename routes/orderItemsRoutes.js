import express from "express";
import orderItemsRepo from "../repo/orderItems.js";

const router = express.Router();

// GET all order items
router.get('/', (req, res) => {
    res.send(orderItemsRepo.getAllOrderItems());
});

// GET specific order item
router.get('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const orderItem = orderItemsRepo.getSpecificOrderItem(orderItemId);

    if (!orderItem) {
        return res.status(404).send({ message: "order item not found" });
    }
    res.send(orderItem);
});

// DELETE order item
router.delete('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const deletedOrderItem = orderItemsRepo.deledeOrderItem(orderItemId);

    if (!deletedOrderItem) {
        return res.status(404).send({ message: "Order item not deleted." });
    }
    res.send(deletedOrderItem);
});

export default router;