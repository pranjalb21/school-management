import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import School from "./pages/School";
import Navbar from "./components/Navbar";
import AddStudentPage from "./pages/AddStudentPage";
import { useSelector } from "react-redux";
import StudentDetails from "./pages/StudentDetails";
import Teachers from "./pages/Teacher";
import AddTeacherPage from "./pages/AddTeacherPage";
import TeacherDetails from "./pages/TeacherDetails";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Students />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/teacher" element={<Teachers />} />
                    <Route path="/school" element={<School />} />
                    <Route path="/add-student" element={<AddStudentPage />} />
                    <Route path="/add-teacher" element={<AddTeacherPage />} />
                    <Route
                        path="/edit-student/:id"
                        element={<AddStudentPage />}
                    />
                    <Route
                        path="/student-detail/:id"
                        element={<StudentDetails />}
                    />
                    <Route
                        path="/edit-teacher/:id"
                        element={<AddTeacherPage />}
                    />
                    <Route
                        path="/teacher-detail/:id"
                        element={<TeacherDetails />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
