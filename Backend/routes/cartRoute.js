const express = require("express");
const { CartModel } = require("../model/cartModel");
const { ProductModel } = require("../model/productModel"); // Import ProductModel to check availability
const { cartAuth } = require("../middleware/cartAuthMiddleware");

const cartRouter = express.Router();

cartRouter.use(cartAuth);

// Add product to cart
cartRouter.post("/add", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate product availability
        const product = await ProductModel.findOne({ productId });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient product quantity available" });
        }

        // Create cart item
        const item = new CartModel({ productId, quantity, userID: req.body.userID });
        await item.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get cart items for the user
cartRouter.get("/", async (req, res) => {
    try {
        const cart = await CartModel.find({ userID: req.body.userID });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete all items from the user's cart
cartRouter.delete("/delete", async (req, res) => {
    try {
        await CartModel.deleteMany({ userID: req.body.userID });
        res.status(200).json({ message: "All cart items deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update quantity of a cart item
cartRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedItem = await CartModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        res.status(200).json({ message: `Cart item with id: ${id} has been updated` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = { cartRouter };