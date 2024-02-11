const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');

const PurchasementMiddleWare = {
    is_buyer: async (req,res,next)=>{
        let userId = req.headers.userid;
        try {
            userId = new mongoose.Types.ObjectId(userId);
            let user = await UserModel.findById(userId);
            if(user){
                if(user.role =="buyer"){
                    next();
                } else {
                    return res.status(422).send({msg: "Unauthorized, not a buyer."});
                }
            } else {
                return res.status(404).send({msg: "User Not found"})
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PurchasementMiddleWare;