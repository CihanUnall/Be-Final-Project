import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// isValidatePassword
function isValidatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidatePassword(password)) {
      return res.status(400).json({
        message:
          "Passwort muss mindestens 8 Zeichen lang sein und Groß- und Kleinbuchstaben sowie Zahlen enthalten.",
      });
    }

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "E-Mail bereits vergeben" });

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    console.error("Registrierungsfehler:", err); // Log in Konsole
    res
      .status(500)
      .json({ message: "Fehler bei Registrierung", error: err.message });
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

export const logoutUser = async (req, res) => {
  try {
    // Kein Token mehr setzen (auf Client löschen)
    res
      .status(200)
      .json({ message: "Logout erfolgreich, Token bitte im Client löschen." });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Logout", error: err });
  }
};
