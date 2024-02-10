const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');
const UserController = {};

UserController.createUser = async (req, res) => {
    let user_data = req.body.user;
    try{
        let user = new UserModel(user_data);
        await user.save();
        return res.status(200).send({ user })
    } catch (error){
        console.log(error)
        return res.status(400).send({ msg: error.message })
    }
}

UserController.getUser = async (req, res) => {
    let userId = req.params.userId;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        if(user){
            return res.status(200).send({user});   
        } else {
            return res.status(404).send({msg: "Not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ msg: error.message })
    }   
}

UserController.updateUser = async (req, res) => {


    
}

UserController.deleteUser = async (req, res) => {

    
}

UserController.getAllUsers = async (req, res) => {

}

module.exports = UserController;