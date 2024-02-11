const express = require('express');
const purchasementRouter = express.Router();
const PurchasementController = require("../controllers/purchasementController");

purchasementRouter.post("/deposit", async (req, res) =>{
    PurchasementController.deposit(req, res);
});

purchasementRouter.post("/buy", async(req,res)=>{
    PurchasementController.buy(req, res);
});

purchasementRouter.post("/reset", async(req, res)=>{
    PurchasementController.reset(req, res);
});

module.exports = purchasementRouter;