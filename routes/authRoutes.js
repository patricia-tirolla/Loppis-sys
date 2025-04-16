import express from "express";
import bcrypt from "bcryptjs";
import authRepo from "../repo/auth.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { password } = req.body;

    const row = authRepo.auth();

    if (!row) {
        return res.status(500).json({ message: "No password stored" });
    }

    const isMatch = await bcrypt.compare(password, row.hashed_password);
    if (isMatch) {
        res.json({ message: "Access granted" });
    } else {
        res.status(401).json({ message: "Access denied" });
    }
});

export default router;