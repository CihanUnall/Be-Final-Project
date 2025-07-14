import Product from "../models/Product.js"; // Dein Product Mongoose Modell

// Alle Produkte abrufen
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Ein Produkt erstellen
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// Einzelnes Produkt abrufen
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Produkt nicht gefunden");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Produkt bearbeiten
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Produkt nicht gefunden");
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Produkt löschen
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Produkt nicht gefunden");
    }

    await product.deleteOne();
    res.json({ message: "Produkt gelöscht" });
  } catch (err) {
    next(err);
  }
};
