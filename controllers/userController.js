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
    let userId = req.params.userId;
    let updated_user = req.body.user;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Not found' });
        }

        if (updated_user.username){
            user.username = updated_user.username;
        }

        if(updated_user.password){
            user.password = updated_user.password;
        }

        if(updated_user.role){
            user.role = updated_user.role;
        }

        if (updated_user.deposit >= 0){
            user.deposit = updated_user.deposit;
        }

        if(updated_user.products){
            user.products = updated_user.products;
        }
        
        await user.save();
        return res.status(200).send({user});   
    } catch (error) {
        console.log(error)
        return res.status(400).send({ msg: error.message })
    }   
}

UserController.deleteUser = async (req, res) => {
    console.log("delete........")
    let userId = req.params.userId;
    try {
        userId = new mongoose.Types.ObjectId(userId);
        let user = await UserModel.findById(userId);
        if (user) {
            await user.deleteOne();
            return res.status(200).send({ message: 'User Deleted successfully' });
        } else {
            return res.status(404).send({ msg: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

UserController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = UserController;