import express from "express";
import mongoose from "mongoose";
import groupRouter from "./routes/groupRoutes.js";
import notesRouter from "./routes/notesRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.use("/api/group", groupRouter);
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connect successful to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
