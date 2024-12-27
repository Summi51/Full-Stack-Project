const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }, // Total available stock
    images: { type: Array, required: true },
    description: { type: String, required: true },
}, {
    versionKey: false
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = { ProductModel };