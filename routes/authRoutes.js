import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authRepo from "../repo/auth.js";
import authenticateToken from "../authentication/authenticateToken.js";

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"

router.post('/', async (req, res) => {
    const { password } = req.body;

    const row = authRepo.auth();

    if (!password) {
        return res.status(400).json({ message: "Password property is required!" });
    }

    if (!row) {
        return res.status(500).json({ message: "No password stored" });
    }

    try {
        const isMatch = await bcrypt.compare(password, row.hashed_password);
        if (isMatch) {
            const token = jwt.sign({ authorized: true }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ message: "Access granted", token });
        } else {
            res.status(401).json({ message: "Access denied" });
        }
    } catch (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ message: "Internal error during password check" });
    }
});

router.get('/protected-data', authenticateToken, (req, res) => {
    res.json({ secret: "This is protected data!" });
});

export default router;