import React from "react";
import StudentForm from "../components/StudentForm";
import { documentTitle } from "../constants/constants";

export default function AddStudentPage() {
    document.title = `${documentTitle} | Add Student`;
    return (
        <main className="container mt-3">
            <StudentForm />
        </main>
    );
}
