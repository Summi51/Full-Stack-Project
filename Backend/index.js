const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { productRouter } = require("./routes/productRoute.js");
const {cartRouter} = require("./routes/cartRoute.js")
// const {orderRouter} = require("./routes/orderRoute.js")

require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Masai");
  console.log("Hello Masai");
});

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/cart", cartRouter);

// app.use("/orders", orderRouter);


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});