import mongoose from "mongoose";
import colors, { rainbow } from "colors";

process.loadEnvFile();

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.rainbow(`MongoDB connection established ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
};
