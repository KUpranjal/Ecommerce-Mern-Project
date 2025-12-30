const { Checkout } = require("../Model/checkout")
const {Product} = require("../Model/product")

const addProduct = async(req, res) =>{
   try {
         const {id, q} = req.body
         const foundProduct = await Product.findById(id)
         if(!foundProduct)
         {
            throw new Error("Product does not exist")
         }
         const prevCart = req.user.cart
         let isProduct = false

         
        for(let item of prevCart)
        {
            if(item.product._id.toString() == id.toString())
            {
                isProduct = true 
                item.quentity = q
                break
            }
            
        }

        if(!isProduct)
        {
            req.user.cart.push(...prevCart, {product: foundProduct, quentity : q})
            const cart = await req.user.save()
        }
       

      
         
         res.status(200).json({Success : true ,  data : prevCart})
   } catch (error) {
     res.status(400).json({error : error.message})
   }
}
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

   

    const foundProduct = req.user.cart.filter(
      item => item.product._id.toString() != id
    );

    req.user.cart = foundProduct;

    await req.user.save();

    res.status(200).json({ msg: "done" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const removeAllproduct=async(req,res)=>{
try {
    req.user.cart=[]
    await req.user.save()
    res.status(200).json({msg:"allClear"})
} catch (error) {
    res.status(400).json({error:error.message})
}
}
const buyProduct = async (req, res) => {
  try {
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
      product: cart
    });

    res.status(200).json({
      msg: "Payment Successful",
      data: checkoutInfo
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    addProduct,
    removeProduct,
    removeAllproduct,
    buyProduct
}