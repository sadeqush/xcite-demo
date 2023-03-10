import express from "express";
import cors from "cors";
import { StudentRouter } from "./modules/student/student.route";
import { ClassRouter } from "./modules/class/class.route";

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

//Routes
app.use("/student", StudentRouter);
app.use("/class", ClassRouter);

export default app;
