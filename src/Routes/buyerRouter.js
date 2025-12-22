const express  = require("express")
const { addProduct } = require("../Controller/BuyerController")
const { isBuyer } = require("../Middleware/isBuyer")
const { isLoggedIn } = require("../Middleware/isLoggedIn")
const router = express.Router()


router.patch("/addproduct", isLoggedIn, isBuyer , addProduct )




module.exports = {
    buyerRouter : router
}