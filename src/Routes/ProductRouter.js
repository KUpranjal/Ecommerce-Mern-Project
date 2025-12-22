const express = require("express");
const {Product} = require("../Model/product");

const router = express.Router();
router.post("/product", async (req, res) => {
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
});

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).json({success: false, message: "Product not found"
      });
    }

    res.status(200).json({ success: true, data: foundProduct
    });

  } catch (error) { res.status(400).json({success: false, error: error.message
    });
  }
});


router.delete("/product/:id", async (req, res) => {
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
});
router.patch("/product/edit/:id", async(req , res) => {
  try {
         const {id} = req.params
         const {name , price, desc, quantity, image , category} = req.body
         if(!id)
         {
          throw new Error("Product Does not exist")
         }

         const updatedProducts = await Product.findByIdAndUpdate(id ,{name , price, desc, quantity, image , category}, {new : true})
         res.status(200).json({Success : true , data : updatedProducts})
  } catch (error) {
      res.status(400).json({error : error.message})
  }
})


module.exports = {
    productRoutes:router
};
