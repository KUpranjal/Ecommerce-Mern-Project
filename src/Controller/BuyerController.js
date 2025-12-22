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


module.exports = {
    addProduct
}