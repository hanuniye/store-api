require("dotenv").config();

const product = require("./products.json");
const productModel = require("./models/products");
const connectDB = require("./db/connection");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productModel.deleteMany();
    await productModel.create(product);
    console.log("sucess!!!!");

    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()