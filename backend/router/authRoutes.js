import express from "express";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validate.validateRegister, (req, res) => {
  res.json({ message: "Registrierung erfolgreich (Mock)." });
});

export default router;
