import express from "express";
import router from "./router";

const app = express();

//Read data from request body
app.use(express.json());

app.use("/", router);

export default app;
