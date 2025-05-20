import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
export default function SchoolTeachers() {
    const dispatch = useDispatch();
    const { teachers, error, status } = useSelector((state) => state.teacher);

    const totalteachers = teachers.length;

    useEffect(() => {
        dispatch(fetchTeachers({}));
    }, []);
    return (
        <div className="container mt-3">
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>Total teachers: {totalteachers}</p>
                </>
            )}
        </div>
    );
}
