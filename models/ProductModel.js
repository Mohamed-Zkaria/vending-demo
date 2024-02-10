const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    cost:{
        type: Number,
        enum: [5, 10, 20, 50, 100],
    },
    amountAvailable:{
        type: Number,
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;