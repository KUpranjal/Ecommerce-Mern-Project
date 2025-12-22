require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cp = require("cookie-parser");

const { productRoutes } = require("./Routes/ProductRouter");
const { AuthRouter } = require("./Routes/AuthRouter");
const { buyerRouter } = require("./Routes/buyerRouter");
const app = express();
app.use(cp());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is Running on " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("DB connection failed", error);
  });
app.use("/api", AuthRouter);
app.use("/api", buyerRouter);
app.use("/api", productRoutes);
