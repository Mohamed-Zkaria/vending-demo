const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const AdminMiddleWare = require("../middlewares/adminMiddleWare");

userRouter.post("/", async (req,res) =>{
    UserController.createUser(req,res);
});

userRouter.get("/all", AdminMiddleWare.is_admin, async(req,res) =>{
    UserController.getAllUsers(req,res);
});

userRouter.get("/:userId", AdminMiddleWare.is_admin, async(req,res) =>{
    UserController.getUser(req,res);
});

userRouter.put("/:userId", AdminMiddleWare.is_admin, async(req,res) =>{
    UserController.updateUser(req,res);
});

userRouter.delete("/:userId", AdminMiddleWare.is_admin, async(req,res) =>{
    UserController.deleteUser(req,res);
});


module.exports = userRouter;