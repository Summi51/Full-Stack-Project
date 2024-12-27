// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//     userID: { type: String, required: true },
//     products: [
//         {
//             productId: { type: String, required: true },
//             quantity: { type: Number, required: true },
//             price: { type: Number, required: true },
//         },
//     ],
//     totalPrice: { type: Number, required: true },
//     shippingAddress: { type: String, required: true },
//     paymentStatus: {
//         type: String,
//         enum: ["Pending", "Paid", "Failed"],
//         default: "Pending",
//     },
//     orderStatus: {
//         type: String,
//         enum: ["Pending", "Processing", "Shipped", "Delivered"],
//         default: "Pending",
//     },
// }, {
//     timestamps: true,
//     versionKey: false
// });

// const OrderModel = mongoose.model("orders", orderSchema);
// module.exports = { OrderModel };
