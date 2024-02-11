const mongoose = require('mongoose');
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const ReceiptModel = require("../models/ReceiptModel")
const PurchasementController = {};

PurchasementController.deposit = async (req, res) => {
    let userId = req.headers.userid;
    let deposit = req.body.deposit;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        if( deposit && deposit> 0){
            user.deposit = deposit;
            await user.save();
            return res.status(200).send({user});
        } else {
            return res.status(402).send({msg: "Invalid deposit."})
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


PurchasementController.buy = async (req, res) =>{
    let userId = req.headers.userid;
    let productId = req.body.productId;
    let amountWanted = req.body.qty
    console.log({productId})
    console.log({userId})
    console.log({amountWanted})
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);

        productId = new mongoose.Types.ObjectId(productId);
        let product = await ProductModel.findById(productId);
        console.log({product})
        if(amountWanted > product.amountAvailable){
            return res.status(402).send(`Not enough products, ${product.amountAvailable} left`);
        }
        
        let totalCost = product.cost * amountWanted;
        
        if(user.deposit < totalCost){
            return res.status(402).send(`Not enough deposit, ${user.deposit} left and total cost is: ${totalCost}`);
        }

        product.amountAvailable =  product.amountAvailable - amountWanted;
       
        user.deposit = user.deposit - totalCost;
       
        let receipt = new ReceiptModel();
        receipt.buyerId = user._id;
        receipt.productId = product._id;
        receipt.quantity = amountWanted;

        await receipt.save();
        await product.save();
        await user.save();

        return res.status(200).send({product, totalAmount: amountWanted})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

PurchasementController.reset = async (req, res) =>{
    let userId = req.headers.userid;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        user.deposit = 0;
        await user.save();
        return res.status(200).send({user});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = PurchasementController;