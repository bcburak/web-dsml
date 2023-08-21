"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
// import userRouter from './routes/user.route';
// import authRouter from './routes/auth.route';
const session_route_1 = __importDefault(require("./routes/session.route"));
const app = (0, express_1.default)();
// Middleware
// 1. Body Parser
app.use(express_1.default.json({ limit: "10kb" }));
// 2. Cookie Parser
app.use((0, cookie_parser_1.default)());
// 3. Logger
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
// 4. Cors
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
}));
// // Routes
// app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);
// 👇 Register the session router
app.use("/api/sessions", session_route_1.default);
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
// UnKnown Routes
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Global Error Handler
app.use((err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
const port = config_1.default.get("port");
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // 👇 call the connectDB function here
    (0, connectDB_1.default)();
});
//# sourceMappingURL=app.js.map