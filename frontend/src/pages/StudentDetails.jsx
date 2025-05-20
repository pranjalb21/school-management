import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteStudent,
    fetchStudentById,
} from "../features/students/studentSlice";
import { documentTitle } from "../constants/constants";

export default function StudentDetails() {
    document.title = `${documentTitle} | Student Details`;

    const { id } = useParams();

    const { selectedStudent, status } = useSelector((state) => state.student);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStudentById(id));
    }, [id]);
    return (
        <main className="container mt-3">
            <h2 className="fs-2">Student Detail</h2>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : selectedStudent ? (
                <>
                    <p>Name: {selectedStudent?.name}</p>
                    <p>Age: {selectedStudent?.age}</p>
                    <p>Grade: {selectedStudent?.grade}</p>
                    <p>Gender: {selectedStudent?.gender || "Not Specified"}</p>
                    <p>
                        Attendance:
                        {selectedStudent?.attendance || "Not Specified"}
                    </p>
                    <p>Marks: {selectedStudent?.marks || "Not Specified"}</p>
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                            navigate(`/edit-student/${selectedStudent._id}`)
                        }
                    >
                        Edit Details
                    </button>
                    <button
                        className="btn btn-sm btn-danger ms-3 px-4"
                        onClick={() => {
                            dispatch(deleteStudent(selectedStudent._id));
                            navigate("/", { replace: true });
                        }}
                    >
                        Delete
                    </button>
                </>
            ) : (
                <p>Student not found.</p>
            )}
        </main>
    );
}
