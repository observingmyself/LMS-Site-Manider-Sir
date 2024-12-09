import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "30kb" }))
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
app.use(cors({
  Credential: true,
  origin: process.env.CORS_ORIGIN
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!")
})
// import Routes
import { userRouter } from "./routes/user.routes.js";
import { registerRouter } from "./routes/register.routes.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/register", registerRouter)
export { app };





