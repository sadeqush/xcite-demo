import { Router } from "express";
import { StudentController } from "./student.controller";

export const StudentRouter = Router();

StudentRouter.post("/add", StudentController.addStudent);
StudentRouter.post("/edit", StudentController.addStudent);
StudentRouter.post("/delete", StudentController.addStudent);
StudentRouter.get("/summary", StudentController.getStudentSummary);
StudentRouter.get("/:id", StudentController.getStudentById);
