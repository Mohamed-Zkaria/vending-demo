const express = require('express');
const productRouter = express.Router();
const ProductController = require("../controllers/productController");
const SellerMiddleWare = require("../middlewares/sellerMiddlerWare");

productRouter.post("/", SellerMiddleWare.is_seller, async (req, res) =>{
    ProductController.createProduct(req, res);
});

productRouter.get("/all", async(req, res) =>{
    ProductController.getAllProducts(req, res);
});

productRouter.get("/:productId", async(req, res) =>{
    ProductController.getProduct(req, res);
});

productRouter.put("/:productId", SellerMiddleWare.is_seller, SellerMiddleWare.seller_own_product, async(req, res) =>{
    ProductController.updateProduct(req, res);
});

productRouter.delete("/:productId", SellerMiddleWare.is_seller, SellerMiddleWare.seller_own_product, async(req,res) =>{
    ProductController.delteProduct(req, res);
});


module.exports = productRouter;