import express from "express";
import cors from "cors";

// Initialization
const app = express();

// Configuration
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
