import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: true, limit: "100mb" }))

const allowedOrigins = process.env.CORS_ORIGIN.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed by the server'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies or authorization headers to be sent
};

// Use the CORS middleware in your app
app.use(cors(corsOptions));


app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// import Routes
import { userRouter } from "./routes/user.routes.js";
import { registerRouter } from "./routes/register.routes.js";
import { newsRouter } from "./routes/news.routes.js";
import { blogRouter } from "./routes/blog.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { contactRouter } from "./routes/contact.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { teamRouter } from "./routes/team.routes.js";
import { certificateRouter } from "./routes/certificate.routes.js";
import { paymentRouter } from "./routes/coursePurchase.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/certificate", certificateRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/payment", paymentRouter);
app.use(errorHandler())
export { app };





