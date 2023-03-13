import { prisma } from "../../prisma";

export const StudentService = {
  addStudent: async (name: string) => {
    try {
      const createdStudent = await prisma.student.create({
        data: { name: name },
      });
      return createdStudent;
    } catch (error) {
      return false;
    }
  },

  editStudent: async (id: string, name: string) => {
    try {
      const updatedStudent = await prisma.student.update({
        where: { id: id },
        data: { name: name },
      });
      return updatedStudent;
    } catch (error) {
      return false;
    }
  },

  deleteStudent: async (id: string) => {
    try {
      await prisma.student.update({
        where: { id: id },
        data: { isActive: false },
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  getStudentSummary: async () => {
    try {
      const retval = prisma.student.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      });
      return retval;
    } catch (error) {
      return false;
    }
  },

  getStudentById: async (studentId: string) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          StudentEnrolledInClasses: {
            select: {
              class: { select: { name: true, id: true, isActive: true } },
            },
          },
        },
      });
      return student;
    } catch (error) {
      return false;
    }
  },
};
