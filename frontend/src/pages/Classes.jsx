import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";
import { documentTitle } from "../constants/constants";

export default function Classes() {
    document.title = `${documentTitle} | Class`;

    const { students, status, error } = useSelector((state) => state.student);
    const [gender, setGender] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStudents({}));
    }, []);
    useEffect(() => {
        dispatch(fetchStudents({ gender, sortBy }));
    }, [gender, sortBy]);
    return (
        <main className="container mt-3">
            <h2 className="fs-2">Class View</h2>
            {status === "loading" && <p>Loading...</p>}
            <div className="row">
                <div className="col-sm-6 mb-2">
                    <label htmlFor="gender" className="form-label">
                        Filter by Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="col-sm-6 mb-2">
                    <label htmlFor="search" className="form-label">
                        Sort by:
                    </label>
                    <select
                        name="search"
                        id="search"
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="attendance">Attendance</option>
                        <option value="marks">Marks</option>
                    </select>
                </div>
            </div>
            <div className="mt-3">
                <ul>
                    {students.length > 0 ? (
                        students.map((stud) => (
                            <li key={stud._id}>
                                {stud.name} - {stud.gender} - Marks:{" "}
                                {stud.marks || "Unknown"} - Attendance:{" "}
                                {stud.attendance || "Unknown"}
                            </li>
                        ))
                    ) : (
                        <p>No student found.</p>
                    )}
                </ul>
            </div>
        </main>
    );
}
