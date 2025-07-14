import Product from "../models/Product.js";
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
    });

    // Save product to database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

