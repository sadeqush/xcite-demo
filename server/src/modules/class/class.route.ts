import { Router } from "express";
import { ClassController } from "./class.controller";

export const ClassRouter = Router();

ClassRouter.post("/add", ClassController.addClass);
ClassRouter.get("/add-student", ClassController.addStudentToClass);
ClassRouter.get("/summary", ClassController.getClassSummary);
ClassRouter.get("/:id", ClassController.getClassById);
