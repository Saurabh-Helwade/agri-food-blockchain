import Manufacturer from "@/models/Manufacturer";
import Product from "@/models/Product";
import Supplier from "@/models/Supplier";
import Transporter from "@/models/Transporter";
import mongoose from "mongoose";

// Database Connection

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to the Database");
    });
    Product;
    Manufacturer;
    Supplier;
    Transporter;
    connection.on("error", (error) => {
      console.log("Error: ", error);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default dbConfig;
