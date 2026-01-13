import mongoose from "mongoose";
import colors, { rainbow } from "colors";

process.loadEnvFile();

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host} : ${connection.port}`;
    console.log(colors.rainbow(`MongoDB connection established ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white.bold(`Database connection error: ${error.message}`));
    process.exit(1);
  }
};
