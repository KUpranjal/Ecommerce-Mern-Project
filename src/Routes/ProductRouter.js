const express = require("express");
const {isLoggedIn}=require("../Middleware/isLoggedIn")
const{isSeller}=require("../Middleware/isSeller")
const{isBuyer}=require("../Middleware/isBuyer")

const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../Controller/ProductController");

const router = express.Router();

router.post("/product", isLoggedIn,isSeller,createProduct);
router.get("/product",isLoggedIn,isBuyer, getAllProducts);

router.get("/product/:id",isLoggedIn,isBuyer, getProductById);
router.delete("/product/:id",isLoggedIn,isSeller, deleteProduct);
router.patch("/product/edit/:id",isLoggedIn,isSeller, updateProduct);

module.exports = {
  productRoutes: router,
};
