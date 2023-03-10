import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Student from "./pages/student";
import Class from "./pages/class";
import StudentDetail from "./pages/student-details";
import ClassDetail from "./pages/class-details";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />

          <Route path="/student" element={<Student />} />
          <Route path="/student/:id" element={<StudentDetail />} />

          <Route path="/class" element={<Class />} />
          <Route path="/class/:id" element={<ClassDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
