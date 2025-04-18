import express from "express";
import reportsRepo from "../repo/reports.js";

const router = express.Router();

// GET sellers total report
router.get('/totalBySeller', (req, res) => {
    res.send(reportsRepo());
});

export default router