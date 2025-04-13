import express from "express";
import ordersRepo from "../repo/orders.js";
import orderItemsRepo from "../repo/orderItems.js";
import orders from "../repo/orders.js";

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
    const newOrder = ordersRepo.addOrder();

    if (!newOrder) {
        return res.status(404).send({ message: "Order not added" });
    }
    res.location(`/orders/${newOrder}`).json({ id: newOrder });
});

// ADD new order item
router.post('/:orderId/orderItems/:productId', (req, res) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    const order = ordersRepo.getSpecificOrder(orderId);
    if (!order) {
        return res.status(404).send({ message: "Order not found." });
    }
    
    const orderItem = orderItemsRepo.addOrderItem(orderId, productId);
    res.location(`/orderItems/${orderItem}`).json({ id: orderItem });
});

// GET all order items from specific order
router.get('/:orderId/orderItems', (req, res) => {
    const orderId = req.params.orderId;

    const order = ordersRepo.getSpecificOrder(orderId);
    if(!order) {
        return res.status(404).send({ message: "Order not found." });
    }

    const orderItems = ordersRepo.getAllOrderItemsFromSpecificOrder(orderId);
    res.json(orderItems);
})

export default router;

