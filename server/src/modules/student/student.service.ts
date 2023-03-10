import { prisma } from "../../prisma";

export const StudentService = {
  addStudent: async (name: string) => {
    try {
      await prisma.student.create({ data: { name: name } });
      return true;
    } catch (error) {
      return false;
    }
  },

  editStudent: async (id: string, name: string) => {
    try {
      await prisma.student.update({ where: { id: id }, data: { name: name } });
      return true;
    } catch (error) {
      return false;
    }
  },

  deleteStudent: async (id: string) => {
    try {
      await prisma.student.delete({ where: { id: id } });
      return true;
    } catch (error) {
      return false;
    }
  },

  getStudentSummary: async () => {
    try {
      const retval = prisma.student.findMany({ select: { name: true } });
      return retval;
    } catch (error) {
      return false;
    }
  },

  getStudentById: async (studentId: string) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });
      return student;
    } catch (error) {
      return false;
    }
  },
};
