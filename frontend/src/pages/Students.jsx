import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";
import { Link, replace, useNavigate } from "react-router-dom";
import { documentTitle } from "../constants/constants";

export default function Students() {
    document.title = `${documentTitle} | Students`;

    const dispatch = useDispatch();
    const { students, status, error } = useSelector((state) => state.student);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchStudents({}));
    }, []);
    return (
        <main className="container mt-3">
            <h1 className="fs-1">Student View</h1>
            <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/add-student")}
            >
                Add Student
            </button>
            <div className="mt-3">
                <h3>Student List</h3>
                {status === "loading" && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <ul>
                    {status !== "loading" &&
                        students?.map((student) => (
                            <li key={student._id}>
                                <Link to={`/student-detail/${student._id}`}>
                                    {student.name} (Age: {student.age})
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </main>
    );
}
