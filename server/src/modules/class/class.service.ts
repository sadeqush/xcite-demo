import { prisma } from "../../prisma";

export const ClassService = {
  addClass: async (name: string) => {
    try {
      const createdClass = await prisma.class.create({ data: { name: name } });
      return createdClass;
    } catch (error) {
      return false;
    }
  },

  editClass: async (name: string, id: string) => {
    try {
      const updatedClass = await prisma.class.update({
        where: { id: id },
        data: { name: name },
      });
      return updatedClass;
    } catch (error) {
      return false;
    }
  },

  deleteClass: async (id: string) => {
    try {
      await prisma.class.update({
        where: { id: id },
        data: { isActive: false },
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  getClassById: async (id: string) => {
    try {
      const retval = await prisma.class.findUnique({
        where: { id: id },
        include: {
          StudentEnrolledInClasses: {
            select: {
              student: { select: { name: true, id: true, isActive: true } },
            },
          },
        },
      });
      return retval;
    } catch (error) {
      return false;
    }
  },

  getClassSummary: async () => {
    try {
      const classes = await prisma.class.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
        },
      });
      return classes;
    } catch (error) {
      return false;
    }
  },

  addStudentToClass: async (classId: string, studentId: string) => {
    try {
      await prisma.studentEnrolledInClass.create({
        data: { studentId: studentId, classId: classId },
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  removeStudentFromClass: async (classId: string, studentId: string) => {
    try {
      await prisma.studentEnrolledInClass.delete({
        where: {
          studentId_classId: { studentId: studentId, classId: classId },
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  checkIfStudentIsEnrolledInClass: async (
    classId: string,
    studentId: string
  ) => {
    try {
      const studentEnrolled = await prisma.studentEnrolledInClass.findUnique({
        where: {
          studentId_classId: {
            studentId: studentId,
            classId: classId,
          },
        },
      });
      if (studentEnrolled) return true;
      else return false;
    } catch (error) {
      //Need to differentiate between database errors and if student is actually not enrolled.
      throw error;
    }
  },
};
