import { Router } from "express";
import { ClassController } from "./class.controller";

export const ClassRouter = Router();

ClassRouter.post("/add", ClassController.addClass);
ClassRouter.post("/edit", ClassController.editClass);
ClassRouter.post("/delete", ClassController.deleteClass);
ClassRouter.post("/add-student", ClassController.addStudentToClass);
ClassRouter.post("/remove-student", ClassController.removeStudentFromClass);
ClassRouter.get("/summary", ClassController.getClassSummary);
ClassRouter.get("/:id", ClassController.getClassById);
