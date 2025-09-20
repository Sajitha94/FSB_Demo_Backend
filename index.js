import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("./public"));

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleString());

  next();
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);


app.get("/", (req, res) => {
  res.send("<h1>Apication is working</h1>");
});

const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on${PORT}`);
  connectDB();
});
