import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
export default function SchoolTeachers() {
    const dispatch = useDispatch();
    const { teachers, error, status } = useSelector((state) => state.teacher);

    const totalteachers = teachers.length;
    const subjects = {};

    teachers.map((teacher) => {
        if (!subjects[teacher.subject]) {
            subjects[teacher.subject] = 1;
        }
    });

    useEffect(() => {
        dispatch(fetchTeachers({}));
    }, []);
    return (
        <div className="container mt-3">
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p className="fw-normal fs-6">
                        Total available teachers: {totalteachers || 0}
                    </p>
                    <p className="fw-normal fs-6">
                        Teacher availability for subjcts:{" "}
                        {Object.keys(subjects).join(", ") || "Unknown"}
                    </p>
                </>
            )}
        </div>
    );
}
