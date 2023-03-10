import express from "express";
import cors from "cors";

const APP_PORT = process.env.APP_PORT || 3000;

// Initialization
const app = express();

// Configuration
app.set("port", APP_PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

export default app;
