const mongoose = require('mongoose');
const mongoURL = `mongodb://mongo:27017/vending_demo`;


const DBConnection = () => {
    mongoose.connect(mongoURL).catch(err=>{
        console.log("error", err)
    });
};

module.exports = DBConnection;


