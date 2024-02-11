const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');

const SellerMiddleWare = {
    is_seller: async (req,res,next)=>{
        let userId = req.headers.userid;
        try {
            userId = new mongoose.Types.ObjectId(userId);
            let user = await UserModel.findById(userId);
            if(user){
                if(user.role =="seller"){
                    next();
                } else {
                    return res.status(422).send({msg: "Unauthorized, not a seller."});
                }
            } else {
                return res.status(404).send({msg: "User Not found"})
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    seller_own_product: async (req, res, next) => {
        
        let userId = req.headers.userid;
        let productId = req.params.productId
        
        try {
            productId = new mongoose.Types.ObjectId(productId);
            let product = await ProductModel.findById(productId);
            userId = new mongoose.Types.ObjectId(userId);
            let user = await UserModel.findById(userId);
            if(!product){
                return res.status(404).send({msg: "Product not found."});
            }
            if(user){
                if (user.products.includes(productId)){
                    next();
                } else {
                    return res.status(422).send({msg: "Unauthorized, Don't own product."});
                }
            } else {
                return res.status(404).send({msg: "User Not found"})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: error.message })
        }   
    }
}

module.exports = SellerMiddleWare;