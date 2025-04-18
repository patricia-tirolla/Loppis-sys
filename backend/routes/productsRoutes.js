import express from "express";
import productsRepo from "../repo/products.js";
import authenticateToken from "../authentication/authenticateToken.js";


const router = express.Router();

// GEL all products
router.get('/', authenticateToken, (req, res) => {
    res.send(productsRepo.getAllProducts());
});

// GET specific product
router.get('/:productId', authenticateToken, (req, res) => {
    const productId = req.params.productId;
    const product = productsRepo.getSpecificProduct(productId);

    if (!product) {
        return res.status(404).send( {error: "Product not found"} );
    }
    res.send(product);
});

// DELETE product
router.delete('/:productId', authenticateToken, (req, res) => {
    const productId = req.params.productId;

    const product = productsRepo.getSpecificProduct(productId);
    if (!product) {
        return res.status(404).send({ message: "Product not found" });
    }

    const deleted = productsRepo.deleteProduct(productId);
    res.status(200).send(deleted);
});

// UPDATE product
router.patch('/:productId', authenticateToken, (req, res) => {
    const productId = req.params.productId;

    const product = productsRepo.getSpecificProduct(productId);
    if (!product) {
        return res.status(404).send({ message: "Product not found" });
    }

    const { category, price } = req.body;
    if (category) {
        product.category = category;
    }
    if (price) {
        product.price = price;
    }

    const updatedProduct = productsRepo.updateProduct(product);
    res.status(200).send(updatedProduct);
});

export default router;