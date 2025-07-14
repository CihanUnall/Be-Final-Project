import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "E-Mail bereits vergeben" });

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Fehler bei Registrierung", error: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ message: "E-Mail oder Passwort ist falsch" });
    }

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Login", error: err });
  }
};
