const mongoose = require('mongoose');
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const ProductController = {};

ProductController.createProduct = async (req, res) => {
    let product_data = req.body.product;
    let userId = req.headers.userid;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        
        const product = new ProductModel(product_data);
        if(!product.amountAvailable < 0){
            return res.status(422).send({msg: "Quantity can't be negative."});
        }
        product.sellerId = user._id;
        await product.save();
        
        user.products.push(product);
        await user.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

ProductController.getProduct = async (req, res) => {
    let productId = req.params.productId;
    try {
        productId = new mongoose.Types.ObjectId(productId);
        const product = await ProductModel.findById(productId);
        if(product){
            return res.status(200).send({product});   
        } else {
            return res.status(404).send({msg: "Product Not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

ProductController.updateProduct = async (req, res) => {
    let productId = req.params.productId;
    let updated_product = req.body.product
    try {
        productId = new mongoose.Types.ObjectId(productId);
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (updated_product.productName){
            product.productName = updated_product.productName;
        }

        if(updated_product.cost){
            product.cost = updated_product.cost;
        }

        if(updated_product.amountAvailable < 0){
            return res.status(422).send({msg: "Quantity can't be negative."});
        }

        if(updated_product.amountAvailable){
            product.amountAvailable = updated_product.amountAvailable;
        }
        
        await product.save();
        return res.status(200).send({product});   
    } catch (error) {
        console.log(error)
        return res.status(400).send({ msg: error.message })
    }   
}

ProductController.delteProduct = async (req, res) => {
    let productId = req.params.productId;
    try {
        productId = new mongoose.Types.ObjectId(productId);
        const product = await ProductModel.findById(productId);
        if (product) {
            let user = await UserModel.findById(product.sellerId);
            let newProducts = user.products.filter(id => id.toString() !== product._id.toString());
            user.products = newProducts;
            await user.save();
            await product.deleteOne();


            return res.status(200).send({ message: 'Product Deleted successfully' });
        } else {
            return res.status(404).send({ msg: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

ProductController.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = ProductController;