import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteTeacher,
    fetchTeacherById,
} from "../features/teachers/teacherSlice";
import { documentTitle } from "../constants/constants";

export default function TeacherDetails() {
    document.title = `${documentTitle} | Teacher Details`;

    const { id } = useParams();

    const { selectedTeacher, status } = useSelector((state) => state.teacher);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTeacherById(id));
    }, [id]);
    return (
        <main className="container mt-3">
            <h2 className="fs-2">Teacher Detail</h2>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : selectedTeacher ? (
                <>
                    <p>Name: {selectedTeacher?.name}</p>
                    <p>Subject: {selectedTeacher?.subject}</p>
                    <p>Age: {selectedTeacher?.age}</p>
                    <p>Gender: {selectedTeacher?.gender || "Not Specified"}</p>
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                            navigate(`/edit-teacher/${selectedTeacher._id}`)
                        }
                    >
                        Edit Details
                    </button>
                    <button
                        className="btn btn-sm btn-danger ms-3 px-4"
                        onClick={() => {
                            dispatch(deleteTeacher(selectedTeacher._id));
                            navigate("/", { replace: true });
                        }}
                    >
                        Delete
                    </button>
                </>
            ) : (
                <p>Teacher not found.</p>
            )}
        </main>
    );
}
