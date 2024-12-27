// const express = require("express");
// const { CartModel } = require("../model/cartModel");
// const { ProductModel } = require("../model/productModel");
// const { OrderModel } = require("../model/orderModel");
// const { authMiddleware } = require("../middleware/authMiddleware");

// const orderRouter = express.Router();

// orderRouter.use(authMiddleware);

// orderRouter.post("/place-order", async (req, res) => {
//     const { userID, shippingAddress } = req.body;

//     try {
//         // 1. Fetch the cart items for the user
//         const cartItems = await CartModel.find({ userID });
//         if (cartItems.length === 0) {
//             return res.status(400).json({ error: "Your cart is empty" });
//         }

//         // 2. Validate product stock and calculate total price
//         let totalPrice = 0;
//         const orderProducts = [];

//         for (const item of cartItems) {
//             const product = await ProductModel.findOne({ productId: item.productId });
//             if (!product) {
//                 return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
//             }

//             if (product.quantity < item.quantity) {
//                 return res.status(400).json({
//                     error: `Insufficient stock for product ID ${item.productId}`,
//                 });
//             }

//             // Deduct the stock
//             product.quantity -= item.quantity;
//             await product.save();

//             // Prepare product data for the order
//             orderProducts.push({
//                 productId: product.productId,
//                 quantity: item.quantity,
//                 price: product.price,
//             });

//             // Update total price
//             totalPrice += product.price * item.quantity;
//         }

//         // 3. Create the order
//         const newOrder = new OrderModel({
//             userID,
//             products: orderProducts,
//             totalPrice,
//             shippingAddress,
//         });
//         await newOrder.save();

//         // 4. Clear the cart
//         await CartModel.deleteMany({ userID });

//         res.status(201).json({ message: "Order placed successfully", order: newOrder });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = { orderRouter };
