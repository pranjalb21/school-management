import { useSelector } from "react-redux";
import SchoolStudents from "../components/SchoolStudents";
import SchoolTeachers from "../components/SchoolTeachers";
import { documentTitle } from "../constants/constants";

export default function School() {
    document.title = `${documentTitle} | School`;

    return (
        <main className="container mt-3">
            <h2 className="fs-2">School View</h2>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button fs-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Student Information
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <SchoolStudents />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed fs-4"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Teacher Information
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div className="container mt-3">
                                <SchoolTeachers />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
