import axios from "axios";

const baseURL = "http://localhost:3000";

export const StudentAPI = {
  addStudent: async (name) => {
    const url = baseURL + "/student/add";
    const axiosBody = { name: name };
    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  editStudent: async (name, id) => {
    const url = baseURL + "/student/edit";
    const axiosBody = { id: id, name: name };

    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },

  deleteStudent: async (id) => {
    const url = baseURL + "/student/delete";
    const axiosBody = { id: id };

    try {
      const response = await axios.post(url, axiosBody);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  getStudentSummary: async () => {
    const url = baseURL + "/student/summary";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  getStudentDetail: async (id) => {
    const url = `${baseURL}/student/${id}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return false;
    }
  },
};
