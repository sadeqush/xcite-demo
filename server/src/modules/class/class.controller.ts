import { Request, Response } from "express";
import {
  sendExceptionError,
  sendMalformedRequestError,
} from "../../utils/client-errors";
import { ClassService } from "./class.service";

export const ClassController = {
  addClass: async (req: Request, res: Response) => {
    const name = req.body.name;
    if (!name) return sendMalformedRequestError(res);

    const createdClass = await ClassService.addClass(name);
    if (!createdClass) return sendExceptionError(res);

    return res.status(200).json({ class: createdClass });
  },
  editClass: async (req: Request, res: Response) => {
    const id = req.body.id;
    const name = req.body.name;
    if (!name || !id) return sendMalformedRequestError(res);

    const editedClass = await ClassService.editClass(name, id);
    if (!editedClass) return sendExceptionError(res);

    return res.status(200).json({ class: editedClass });
  },
  deleteClass: async (req: Request, res: Response) => {
    const id = req.body.id;
    if (!id) return sendMalformedRequestError(res);

    const deletedSuccessfully = await ClassService.deleteClass(id);
    if (!deletedSuccessfully) return sendExceptionError(res);

    return res.status(200).json({ message: "Deleted Successfully" });
  },
  getClassSummary: async (req: Request, res: Response) => {
    const classes = await ClassService.getClassSummary();
    if (!classes) return sendExceptionError(res);

    return res.status(200).json({ class: classes });
  },

  getClassById: async (req: Request, res: Response) => {
    const id = req.body.id;
    if (!id) return sendMalformedRequestError(res);

    const classById = await ClassService.getClassById(id);
    if (!classById) return sendExceptionError(res);

    return res.status(200).json({ class: classById });
  },

  addStudentToClass: async (req: Request, res: Response) => {
    const studentId = req.body.studentId;
    const classId = req.body.classId;

    if (!studentId || !classId) return sendMalformedRequestError(res);

    const added = await ClassService.addStudentToClass(classId, studentId);
    if (!added) return sendExceptionError(res);

    return res
      .status(200)
      .json({ message: "Student suceessfully added to class." });
  },
  removeStudentFromClass: async (req: Request, res: Response) => {
    const studentId = req.body.studentId;
    const classId = req.body.classId;

    if (!studentId || !classId) return sendMalformedRequestError(res);

    const added = await ClassService.removeStudentFromClass(classId, studentId);
    if (!added) return sendExceptionError(res);

    return res
      .status(200)
      .json({ message: "Student suceessfully removed from class." });
  },
};
