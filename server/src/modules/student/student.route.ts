import { Router } from "express";
import { StudentController } from "./student.controller";

export const StudentRouter = Router();

StudentRouter.post("/add", StudentController.addStudent);
StudentRouter.post("/edit", StudentController.editStudent);
StudentRouter.post("/delete", StudentController.deleteStudent);
StudentRouter.get("/summary", StudentController.getStudentSummary);
StudentRouter.get("/:id", StudentController.getStudentById);
