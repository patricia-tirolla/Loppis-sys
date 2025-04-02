import express from "express";
import sellersRepo from "../repo/sellers.js";

const router = express.Router();

/* GET all sellers */
router.get('/all', (req, res, next) => {
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
  router.put('/:sellerName/:sellerPhone', (req, res) => {
    const sellerName = req.params.sellerName;
    const sellerPhone = req.params.sellerPhone;
    const newSeller = sellersRepo.addSeller(sellerName, sellerPhone);
  
    if (newSeller) {
      res.status(501).send({ message: "Seller already exists" });
    }
    res.status(201).send(newSeller);
  
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

  export default router;