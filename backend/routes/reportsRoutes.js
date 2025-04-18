import express from "express";
import reportsRepo from "../repo/reports.js";
import authenticateToken from "../authentication/authenticateToken.js";


const router = express.Router();

// GET sellers total report
router.get('/totalBySeller', authenticateToken, (req, res) => {
    res.send(reportsRepo());
});

export default router