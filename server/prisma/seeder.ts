import { prisma } from "../src/prisma";

async function seeder() {
  try {
    const student = await prisma.student.create({
      data: { name: "John Smith" },
    });
    const course = await prisma.class.create({
      data: { name: "CSE 115 : Introduction to Computer Science" },
    });

    await prisma.studentEnrolledInClass.create({
      data: { studentId: student.id, classId: course.id },
    });
  } catch (e) {
    throw e;
  }
}

seeder()
  .then(() => {
    console.log("Seeded Successfully!");
  })
  .catch((e) => {
    console.error(e);
  });
