require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connection");
const productRoute = require("./routes/products");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");


const app = express();
const port = process.env.PORT | 5000;

app.use(express.json());

// Routes 
app.use("/api/v1/products", productRoute);

app.use(errorHandlerMiddleware);
app.use(notFound);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`app is running... on port:${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();

