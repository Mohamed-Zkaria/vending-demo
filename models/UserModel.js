const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    deposit: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default: "buyer"
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;