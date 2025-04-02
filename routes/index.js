import express from "express";
import sellersRepo from "../repo/sellers.js";

const router = express.Router();
const app = express();

app.use(express.json());

/* GET all sellers */
router.get('/sellers/all', (req, res, next) => {
  res.send(sellersRepo.getAllSellers());
});

// GET specific seller
router.get('/sellers/:sellerId', (req, res) => {
  const sellerId = req.params.sellerId;
  const seller = sellersRepo.getSpecificSeller(sellerId);

  if (!seller) {
    return res.sendStatus(404).send({
      error: "Seller not found"
    });
  }
  res.send(seller);
});

// ADD new seller
router.put('/sellers/:sellerName/:sellerPhone', (req, res) => {
  const sellerName = req.params.sellerName;
  const sellerPhone = req.params.sellerPhone;

  const newSeller = sellersRepo.addSeller(sellerName, sellerPhone);

  if (newSeller) {
    res.sendStatus(501).send({ message: "Seller already exists" });
  }
  res.sendStatus(201).send(newSeller);

});

// DELETE seller
router.delete('/sellers/:sellerId', (req, res) => {
  const sellerId = req.params.sellerId;

  const deleted = sellersRepo.deleteSeller(sellerId);

  if (!deleted) {
    return res.sendStatus(404).send({ message: "Seller not found" });
  }
  res.sendStatus(200).send(deleted);
})

export default router;
