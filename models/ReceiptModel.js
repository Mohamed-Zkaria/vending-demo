const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReceiptSchema = Schema({
    buyerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

ReceiptSchema.index({buyerId: 1, productId: 1}, {unique: true})
const ReceiptModel = mongoose.model('Reciept', ReceiptSchema);

module.exports = ReceiptModel;