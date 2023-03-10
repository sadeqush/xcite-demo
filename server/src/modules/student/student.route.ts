import { Router } from "express";
import { StudentController } from "./student.controller";

export const StudentRouter = Router();

StudentRouter.post("/add", StudentController.addStudent);
StudentRouter.get("/summary", StudentController.getStudentSummary);
StudentRouter.get("/:id", StudentController.getStudentById);
