import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import musicRoutes from "./routes/musicRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Express = express();

// Configure CORS based on environment
const allowedOrigins = [
  "http://localhost:8080",
  "https://music-app-three-gilt.vercel.app",
  "https://music-app-xi-flame.vercel.app"
];

// Add any additional origins from environment variables
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/music", musicRoutes);
app.use("/api/auth", authRoutes);

export default app;
