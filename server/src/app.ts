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

//Ping to check server health.
app.get("/", (req, res) => {
  return res.status(200).send("I'm Alive!");
});

export default app;
