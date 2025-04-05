import express from "express";
import productsRepo from "../repo/products.js"

const router = express.Router();

// GEL all products
router.get('/', (req, res) => {
    res.send(productsRepo.getAllProducts());
});

// GET specific product
router.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = productsRepo.getSpecificProduct(productId);

    if (!product) {
        return res.status(404).send( {error: "Product not found"} );
    }
    res.send(product);
});

// DELETE product
router.delete('/:productId', (req, res) => {
    const productId = req.params.productId;
    const deleted = productsRepo.deleteProduct(productId);

    if (!deleted) {
        return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(deleted);
});

// UPDATE product's category
router.patch('/:productId/category', (req, res) => {
    const productId = req.params.productId;
    const { category } = req.body;

    const updatedCatgory = productsRepo.updateProductCategory(productId, category);

    if (!updatedCatgory) {
        return res.status(404).send({ message: "Product's category not updated" });
    }
    res.status(200).send(updatedCatgory)
});

// UPDATE product's price
router.patch('/:productId/price', (req, res) => {
    const productId = req.params.productId;
    const { price } = req.body;

    const updatedPrice = productsRepo.updateProductPrice(productId, price);

    if (!updatedPrice) {
        return res.status(404).send({ message: "Product's price not updated" });
    }
    res.status(200).send(updatedPrice)
});

export default router;