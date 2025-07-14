// Middleware zur Validierung der Registrierung
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Ungültige E-Mail-Adresse." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Passwort muss mindestens 6 Zeichen haben." });
  }

  next();
};

// Middleware zur Validierung von Produkten
const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res
      .status(400)
      .json({ message: "Name, Preis und Lagerbestand sind erforderlich." });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ message: "Ungültiger Preis." });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ message: "Lagerbestand muss eine positive Ganzzahl sein." });
  }

  next();
};

export default {
  validateRegister,
  validateProduct,
};
