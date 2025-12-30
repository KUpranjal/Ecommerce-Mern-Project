const { Product } = require("../Model/product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price, desc, quantity, image, category } = req.body;

    if (!name) throw new Error("Please enter a name");
    if (!price) throw new Error("Please enter a price");
    if (!desc) throw new Error("Please enter a description");
    if (!quantity) throw new Error("Please enter quantity");
    if (!image) throw new Error("Please enter image URL");
    if (!category) throw new Error("Please enter category");

    const createdProduct = await Product.create({
      name,
      price,
      desc,
      quantity,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createdProduct,
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not Exist",
      });
    }

    res.status(200).json({
      success: true,
      data: foundProduct,
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, desc, quantity, image, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, desc, quantity, image, category },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("Product does not exist");
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
