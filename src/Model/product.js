const mongoose = require("mongoose");
const validator = require("validator");


 const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  desc: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },

  image: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid image URL"
    }
  },

  category: {
    type: String,
    required: true,
    enum: ["electronics", "grocery", "fashion"]
  }
});


const Product  = mongoose.model("Product", productSchema);
module.exports = {
    Product
}
