const mongoose=require("mongoose")

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  totalPrice: {
    type: Number,
    required: true
  },
  product: []
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = {
  Checkout
};
