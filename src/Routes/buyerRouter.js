const express  = require("express")
const { addProduct, removeProduct, removeAllproduct, buyProduct } = require("../Controller/BuyerController")
const { isBuyer } = require("../Middleware/isBuyer")
const { isLoggedIn } = require("../Middleware/isLoggedIn")
const router = express.Router()


router.patch("/addproduct", isLoggedIn, isBuyer , addProduct )
router.delete("/removeProduct/:id",isLoggedIn,isBuyer,removeProduct)
router.delete("/removeAllproduct",isLoggedIn,isBuyer,removeAllproduct)
router.post("/buyProduct",isLoggedIn,isBuyer,buyProduct)


module.exports = {
    buyerRouter : router
}