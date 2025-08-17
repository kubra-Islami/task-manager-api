import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("authMiddleware running...");

    const authHeader = req.headers["authorization"];
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    console.log("Extracted token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: " + err.message });
    }
};
export default authMiddleware;
