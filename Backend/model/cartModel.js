const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    userID: { type: String, required: true },
}, {
    versionKey: false
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };