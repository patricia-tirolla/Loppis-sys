import express from "express";
import sellersRepo from "../repo/sellers.js";
import productsRepo from "../repo/products.js";

const router = express.Router();

// GET all sellers 
router.get('/', (req, res, next) => {
  res.send(sellersRepo.getAllSellers());
});

// GET specific seller
router.get('/:sellerId', (req, res) => {
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
router.post('/', (req, res) => {
  const { sellerName, sellerPhone } = req.body;
  const newSeller = sellersRepo.addSeller(sellerName, sellerPhone);

  if (!newSeller) {
    return res.status(501).send({ message: "Seller not added" });
  }
  res.set('Location', `/sellers/${newSeller}`).status(201).send({ id: newSeller });

});

// DELETE seller
router.delete('/:sellerId', (req, res) => {
  const sellerId = req.params.sellerId;
  const deleted = sellersRepo.deleteSeller(sellerId);

  if (!deleted) {
    return res.status(404).send({ message: "Seller not found" });
  }
  res.status(200).send(deleted);
});

// UPDATE seller's phone
router.put('/:phone/:sellerId', (req, res) => {
  const newPhone = req.params.phone;
  const sellerId = req.params.sellerId;
  const updatedPhone = sellersRepo.updateSellerPhone(newPhone, sellerId);

  if (!updatedPhone) {
    return res.status(404).send({ message: "Seller's phone not updated" });
  }
  res.status(200).send(updatedPhone)

});

// UPDATE seller's name
router.patch('/:name/:sellerId', (req, res) => {
  const newName = req.params.name;
  const sellerId = req.params.sellerId;
  const updatedName = sellersRepo.updateSellerName(newName, sellerId);

  if (!updatedName) {
    return res.status(404).send({ message: "Seller's name not updated" });
  }
  res.status(200).send(updatedName)

});

// ADD new product
router.post('/:sellerId/products', (req, res) => {
  const sellerId = req.params.sellerId;

  const { category, price } = req.body;

  const newProduct = productsRepo.addProduct(category, price, sellerId,);
 
  if (!newProduct) {
    return res.status(404).send({ message: "New product not added" });
  }
  res.set('Location', `/products/${newProduct}`).status(201).send({ id: newProduct });
});

export default router;