require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB";
// import userRouter from './routes/user.route';
// import authRouter from './routes/auth.route';
import sessionRouter from "./routes/session.route";

const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 4. Cors
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://web-dsml.vercel.app",
      "https://web-dsml-git-master-bcburak.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// // Routes
// app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);
// 👇 Register the session router
app.use("/api/sessions", sessionRouter);

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.get("/", (req: Request, res: Response) => {
  return res.send("welcome");
});
// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT; //config.get<number>("port");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});
