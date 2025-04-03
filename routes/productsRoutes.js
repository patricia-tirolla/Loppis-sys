import express from "express";
import productsRepo from "../repo/products.js"

const router = express.Router();

// GEL all products
router.get('/products/all', (req, res) => {
    res.send(productsRepo.getAllProducts());
});

// GET specific product
router.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = productsRepo.getSpecificProduct(productId);

    if (!product) {
        return res.status(404).send( {error: "Product not found"} );
    }
    res.send(product);
});

// ADD new product
router.put('/sellers/:sellerId/products/:category/:price/', (req, res) => {
    const sellerId = req.params.sellerId;
    const category = req.params.category;
    const price = req.params.price;
    const newProduct = productsRepo.addProduct(sellerId, category, price);

    if (!newProduct) {
        return res.status(404).send({ message: "New product not added" });
    }
    res.status(201).send(newProduct);
});

// DELETE product
router.delete('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const deleted = productsRepo.deleteProduct(productId);

    if (!deleted) {
        return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(deleted);
});

// UPDATE product's category
router.post('/products/:productId/:category', (req, res) => {
    const productId = req.params.productId;
    const category = req.params.category;
    const updatedCatgory = productsRepo.updateProductCategory(productId, category);

    if (!updatedCatgory) {
        return res.status(404).send({ message: "Product's category not updated" });
    }
    res.status(200).send(updatedCatgory)
});

// UPDATE product's price
router.patch('/products/:productId/:price', (req, res) => {
    const productId = req.params.productId;
    const price = req.params.price;
    const updatedPrice = productsRepo.updateProductPrice(productId, price);

    if (!updatedPrice) {
        return res.status(404).send({ message: "Product's price not updated" });
    }
    res.status(200).send(updatedPrice)
});

export default router;