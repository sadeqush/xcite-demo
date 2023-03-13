import axios from "axios";

const baseURL = "http://localhost:3000/";

export const ClassAPI = {
  // ClassRouter.post("/add", ClassController.addClass);
  addClass: async (name) => {
    const url = baseURL + "/class/add";
    const axiosBody = { name: name };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  // ClassRouter.post("/edit", ClassController.editClass);
  editClass: async (name, id) => {
    const url = baseURL + "/class/edit";
    const axiosBody = { name: name, id: id };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  // ClassRouter.post("/delete", ClassController.deleteClass);
  deleteClass: async (id) => {
    const url = baseURL + "/class/delete";
    const axiosBody = { id: id };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  // ClassRouter.get("/add-student", ClassController.addStudentToClass);
  addStudentToClass: async (classId, studentId) => {
    const url = baseURL + "/class/add-student";
    const axiosBody = { classId: classId, studentId: studentId };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  // ClassRouter.get("/remove-student", ClassController.removeStudentFromClass);
  removeStudentFromClass: async (classId, studentId) => {
    const url = baseURL + "/class/remove-student";
    const axiosBody = { classId: classId, studentId: studentId };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  // ClassRouter.get("/summary", ClassController.getClassSummary);
  getClassSummary: async () => {
    const url = baseURL + "/class/summary";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  // ClassRouter.get("/:id", ClassController.getClassById);
  getClassDetails: async (id) => {
    const url = `${baseURL}/class/${id}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return false;
    }
  },
};
