const { Checkout } = require("../Model/checkout");
const { Product } = require("../Model/product");

// ADD / UPDATE PRODUCT
const addProduct = async (req, res) => {
  try {
    const { id, q } = req.body;

    if (q <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ error: "Product does not exist" });
    }

    let found = false;

    for (let item of req.user.cart) {
      if (item.product.toString() === id.toString()) {
        item.quantity = q; // ✅ FIXED
        found = true;
        break;
      }
    }

    if (!found) {
      req.user.cart.push({
        product: foundProduct._id, // ✅ ONLY ID
        quantity: q,
      });
    }

    await req.user.save();
    await req.user.populate("cart.product");

    res.status(200).json({
      success: true,
      data: req.user.cart.map((c) => ({
        _id: c.product._id,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        totalPrice: c.quantity * c.product.price,
      })),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// REMOVE SINGLE PRODUCT
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    req.user.cart = req.user.cart.filter(
      (item) => item.product.toString() !== id
    );

    await req.user.save();

    res.status(200).json({ msg: "done" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// REMOVE ALL PRODUCTS
const removeAllproduct = async (req, res) => {
  try {
    req.user.cart = [];
    await req.user.save();

    res.status(200).json({ msg: "allClear" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// BUY PRODUCT
const buyProduct = async (req, res) => {
  try {
    await req.user.populate("cart.product");

    const cart = req.user.cart;
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let item of cart) {
      totalPrice += item.product.price * item.quantity;
      totalQuantity += item.quantity;
    }

    const checkoutInfo = await Checkout.create({
      user: req.user._id,
      totalPrice,
      totalQuantity,
      products: cart.map((c) => ({
        product: c.product._id,
        priceAtPurchase: c.product.price,
        quantity: c.quantity,
      })),
    });

    req.user.cart = [];
    await req.user.save();

    res.status(200).json({
      msg: "Payment Successful",
      data: checkoutInfo,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  removeProduct,
  removeAllproduct,
  buyProduct,
};
