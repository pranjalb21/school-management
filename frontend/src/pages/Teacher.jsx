import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
import { Link, replace, useNavigate } from "react-router-dom";
import { documentTitle } from "../constants/constants";

export default function Teachers() {
    document.title = `${documentTitle} | Teachers`;

    const dispatch = useDispatch();
    const { teachers, status, error } = useSelector((state) => state.teacher);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTeachers({}));
    }, []);
    return (
        <main className="container mt-3">
            <h1 className="fs-1">Teacher View</h1>
            <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/add-teacher")}
            >
                Add Teacher
            </button>
            <div className="mt-3">
                <h3>Teacher List</h3>
                {status === "loading" && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <ul>
                    {teachers.length > 0 ? (
                        teachers?.map((teacher) => (
                            <li key={teacher._id}>
                                <Link to={`/teacher-detail/${teacher._id}`}>
                                    {teacher.name} (Age: {teacher.age}) -{" "}
                                    Subject - {teacher.subject}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No teacher found.</p>
                    )}
                </ul>
            </div>
        </main>
    );
}
