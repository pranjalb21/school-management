import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";
export default function SchoolStudents() {
    const dispatch = useDispatch();
    const { students, error, status } = useSelector((state) => state.student);

    const totalStudents = students.length;

    const averageAttendance = (
        students.reduce((acc, curr) => acc + curr.attendance, 0) / totalStudents
    ).toFixed(2);

    const averageMarks = (
        students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents
    ).toFixed(2);

    const topStudent = students.reduce(
        (max, student) => (student.marks > max.marks ? student : max),
        students[0]
    );
    useEffect(() => {
        dispatch(fetchStudents({}));
    }, []);
    return (
        <div className="container mt-3">
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>Total Students: {totalStudents}</p>
                    <p>Average Attendance: {averageAttendance}</p>
                    <p>Average Marks: {averageMarks}</p>
                    <p>Top Student: {topStudent?.name}</p>
                </>
            )}
        </div>
    );
}
