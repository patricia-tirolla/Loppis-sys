import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const SECRET_KEY = process.env.JWT_SECRET

    if (!token) {
        return res.status(401).json({ message: "Access denied: No token prvided." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or Expired Token' });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken