import express from "express";
import orderItemsRepo from "../repo/orderItems.js";
import authenticateToken from "../authentication/authenticateToken.js";

const router = express.Router();

// GET all order items
router.get('/', authenticateToken, (req, res) => {
    res.send(orderItemsRepo.getAllOrderItems());
});

// GET specific order item
router.get('/:orderItemId', authenticateToken, (req, res) => {
    const orderItemId = req.params.orderItemId;
    const orderItem = orderItemsRepo.getSpecificOrderItem(orderItemId);

    if (!orderItem) {
        return res.status(404).send({ message: "order item not found" });
    }
    res.send(orderItem);
});

// DELETE order item
router.delete('/:orderItemId', authenticateToken, (req, res) => {
    const orderItemId = req.params.orderItemId;

    const orderItem = orderItemsRepo.getSpecificOrderItem(orderItemId);
    if (!orderItem) {
        return res.status(404).send({ message: "Order item not found." });
    }

    const deletedOrderItem = orderItemsRepo.deledeOrderItem(orderItemId);
    res.send(deletedOrderItem);
});

export default router;