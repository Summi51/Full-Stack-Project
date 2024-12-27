const express = require("express");

const {auth} = require("../middleware/authMiddleware");

const {ProductModel} = require("../model/productModel");

const productRouter = express.Router();


productRouter.get("/", async (req, res) => {
    try {
      const product = await ProductModel.find();
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });

productRouter.get("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const product = await ProductModel.findById({_id:id});
        if (!product) {
            res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productRouter.use(auth);

productRouter.post("/add", async(req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({message: "Product has been added"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productRouter.patch("/update/:productID",async(req,res)=>{
    const {productID} = req.params;
    try {
        await ProductModel.findByIdAndUpdate({_id:productID},req.body)
        res.status(200).json({message:`Product with id : ${productID} has been updated`});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

productRouter.delete("/delete/:productID",async(req,res)=>{
    const {productID} = req.params;
    try {
        await ProductModel.findByIdAndDelete({_id:productID})
        res.status(200).json({message:`Product with id : ${productID} has been deleted`});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// paginations 

productRouter.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const products = await ProductModel.find()
        .skip((page - 1) * limit)
        .limit(Number(limit));
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });

module.exports = {productRouter};