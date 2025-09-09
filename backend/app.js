// Basic Lib Import
import express from "express";
import router from "./src/routes/api.js"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Security Middleware Imports
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";

// Load environment variables
dotenv.config();
// Express App Init
const app = express();
// Body Parser
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Security Middlewares Implement
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  // sanitize only body and params
  req.body = mongoSanitize.sanitize(req.body);
  req.params = mongoSanitize.sanitize(req.params);
  next();
});
app.use(hpp());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,                // limit each IP to 1000 requests per window
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoIndex: true });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

connectDB();


// Routes

app.use("/api/v1", router);


// Handle Undefined Routes

app.use((req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

// Export App
export default app;
