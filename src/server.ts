import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World in Express and TypeScript!");
});

export default app;
