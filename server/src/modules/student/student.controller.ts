import { Request, Response } from "express";
import {
  sendExceptionError,
  sendMalformedRequestError,
} from "../../utils/client-errors";
import { StudentService } from "./student.service";

export const StudentController = {
  addStudent: async (req: Request, res: Response) => {
    const name = req.body.name;
    if (!name) return sendMalformedRequestError(res);

    const student = await StudentService.addStudent(name);
    if (!student) return sendExceptionError(res);

    return res.status(200).json({ student: student });
  },

  editStudent: async (req: Request, res: Response) => {
    const name = req.body.name;
    const id = req.body.id;
    if (!name || !id) return sendMalformedRequestError(res);

    const student = await StudentService.editStudent(id, name);
    if (!student) return sendExceptionError(res);

    return res.status(200).json({ student: student });
  },

  deleteStudent: async (req: Request, res: Response) => {
    const id = req.body.id;
    if (!id) return sendMalformedRequestError(res);

    const deleted = await StudentService.deleteStudent(id);
    if (!deleted) return sendExceptionError(res);

    return res.status(200).json({ message: "Deleted Successfully" });
  },

  getStudentSummary: async (req: Request, res: Response) => {
    const students = await StudentService.getStudentSummary();
    if (!students) return sendExceptionError(res);

    return res.status(200).json({ students: students });
  },

  getStudentById: async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return sendMalformedRequestError(res);

    const student = await StudentService.getStudentById(id);
    if (!student) return sendExceptionError(res);

    let enrolledClasses: any[] = [];

    student.StudentEnrolledInClasses.forEach((e) => {
      if (e.class.isActive) enrolledClasses.push(e.class);
    });

    let retval = {
      name: student.name,
      id: student.id,
      enrolledClasses: enrolledClasses,
    };

    return res.status(200).json({ student: retval });
  },
};
