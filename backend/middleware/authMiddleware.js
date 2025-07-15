import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const protect = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Kein Token, Zugriff verweigert" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // z. B. { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token ungültig" });
  }
};