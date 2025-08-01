import express from "express";
import sellersRepo from "../repo/sellers.js";
import productsRepo from "../repo/products.js";
import authenticateToken from "../authentication/authenticateToken.js";

const router = express.Router();

// GET all sellers 
router.get('/', authenticateToken, (req, res, next) => {
  res.send(sellersRepo.getAllSellers());
});

// GET specific seller
router.get('/:sellerId', authenticateToken, (req, res) => {
  const sellerId = req.params.sellerId;

  const seller = sellersRepo.getSpecificSeller(sellerId);
  if (!seller) {
    return res.status(404).send({
      error: "Seller not found"
    });
  }
  res.send(seller);
});

// ADD new seller
router.post('/', authenticateToken, (req, res) => {
  const { sellerName, sellerPhone } = req.body;

  const newSeller = sellersRepo.addSeller(sellerName, sellerPhone);
  if (!newSeller) {
    return res.status(501).send({ message: "Seller already exists." });
  }
  res.location(`/sellers/${newSeller}`).status(201).send({ id: newSeller });
});

// DELETE seller
router.delete('/:sellerId', authenticateToken, (req, res) => {
  const sellerId = req.params.sellerId;

  const seller = sellersRepo.getSpecificSeller(sellerId);
  if (!seller) {
    return res.status(404).send({ message: "Seller not found" });
  }

  const deleted = sellersRepo.deleteSeller(sellerId);
  res.status(204).send(deleted);
});

// UPDATE seller
router.patch('/:sellerId', authenticateToken, (req, res) => {
  const sellerId = req.params.sellerId;

  const seller = sellersRepo.getSpecificSeller(sellerId);
  if (!seller) {
    return res.status(404).send({ message: "Seller not found" });
  }

  const { phone, name } = req.body;
  if (name) {
    seller.name = name;
  }
  if (phone) {
    seller.phone = phone;
  }

  const updatedSeller = sellersRepo.updateSeller(seller);
  res.status(200).send(updatedSeller);
});

// ADD new product
router.post('/:sellerId/products', authenticateToken, (req, res) => {
  const sellerId = req.params.sellerId;

  const seller = sellersRepo.getSpecificSeller(sellerId);
  if (!seller) {
    return res.status(404).send({ message: "Seller not found" });
  }

  const { category, price } = req.body;

  const newProduct = productsRepo.addProduct(category, price, sellerId,);
  res.set('Location', `/products/${newProduct}`).status(201).send({ id: newProduct });
});

// GET all products from specific seller
router.get('/:sellerId/products', authenticateToken, (req, res) => {
  const sellerId = req.params.sellerId;

  const seller = sellersRepo.getSpecificSeller(sellerId);
  if (!seller) {
    return res.status(404).send({ message: "Seller not found" });
  }

  const allProducts = sellersRepo.getAllProductsFromSpecificSeller(sellerId);
  res.send(allProducts);
})

export default router;