import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addStudent,
    fetchStudentById,
    updateStudent,
} from "../features/students/studentSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentForm() {
    const { id } = useParams();
    const { error, status, selectedStudent } = useSelector(
        (state) => state.student
    );
    const defaultData = {
        name: "",
        age: 0,
        grade: "",
        gender: "",
    };
    const genders = ["Male", "Female", "Others"];
    const grades = ["A", "B", "C", "D", "F"];
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchStudentById(id));
            const existingStudent = {
                name: selectedStudent.name,
                age: selectedStudent.age,
                gender: selectedStudent.gender || "",
                grade: selectedStudent.grade || "",
                marks: selectedStudent.marks || 0,
                attendance: selectedStudent.attendance || 0,
            };
            setFormData(existingStudent);
        } else {
            setFormData(defaultData);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        if (formData.name === "") {
            setErrors((prev) => ({
                ...prev,
                name: "Please enter student name.",
            }));
        }
        if (parseInt(formData.age) < 1) {
            setErrors((prev) => ({
                ...prev,
                age: "Please enter student age.",
            }));
        }
        if (parseInt(formData.marks) < 1) {
            setErrors((prev) => ({
                ...prev,
                marks: "Please enter student marks.",
            }));
        }
        if (parseInt(formData.attendance) < 1) {
            setErrors((prev) => ({
                ...prev,
                attendance: "Please enter student attendance.",
            }));
        }

        if (!genders.includes(formData.gender)) {
            setErrors((prev) => ({
                ...prev,
                gender: "Please select student gender.",
            }));
        }
        if (!grades.includes(formData.grade)) {
            setErrors((prev) => ({
                ...prev,
                grade: "Please select student grade.",
            }));
        }

        if (Object.keys(errors).length === 0) {
            if (id) {
                dispatch(
                    updateStudent({
                        studentId: selectedStudent._id,
                        studentData: {
                            name: formData.name,
                            age: parseInt(formData.age),
                            grade: formData.grade,
                            gender: formData.gender,
                            attendance: parseInt(formData.attendance),
                            marks: parseInt(formData.marks),
                        },
                    })
                );
                if (!error) {
                    setFormData(defaultData);
                    navigate("/", { replace: true });
                }
            } else {
                dispatch(addStudent(formData));
                if (!error) {
                    setFormData(defaultData);
                    navigate("/", { replace: true });
                }
            }
        }
    };
    return (
        <div>
            {status === "loading" && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <h2>{id ? "Update " : "Add "} Student</h2>
                <hr />
                <div className="row">
                    <div className="col-md-6  mb-2">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="form-control"
                        />
                        {errors.name && (
                            <p className="text-danger m-0">
                                * <small>{errors.name}</small>
                            </p>
                        )}
                    </div>
                    <div className="col-md-6  mb-2">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="form-control"
                        />
                        {errors.age && (
                            <p className="text-danger m-0">
                                * <small>{errors.age}</small>
                            </p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6  mb-2">
                        <label htmlFor="gender" className="form-label">
                            Gender
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className={"form-select"}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        {errors.gender && (
                            <p className="text-danger m-0">
                                * <small>{errors.gender}</small>
                            </p>
                        )}
                    </div>
                    <div className="col-md-6  mb-2">
                        <label htmlFor="grade" className="form-label">
                            Grade
                        </label>
                        <select
                            name="grade"
                            id="grade"
                            value={formData.grade}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className={"form-select"}
                        >
                            <option value="">Select Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                        </select>
                        {errors.grade && (
                            <p className="text-danger m-0">
                                * <small>{errors.grade}</small>
                            </p>
                        )}
                    </div>
                </div>
                {id && (
                    <>
                        <div className="row">
                            <div className="col-md-6  mb-2">
                                <label htmlFor="marks" className="form-label">
                                    Marks
                                </label>
                                <input
                                    type="number"
                                    id="marks"
                                    name="marks"
                                    value={formData.marks || 0}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                    className="form-control"
                                />
                                {errors.marks && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.marks}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6  mb-2">
                                <label
                                    htmlFor="attendance"
                                    className="form-label"
                                >
                                    Attendance
                                </label>
                                <input
                                    type="number"
                                    id="attendance"
                                    name="attendance"
                                    value={formData.attendance || 0}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                    className="form-control"
                                />
                                {errors.attendance && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.attendance}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}
                <button className="btn btn-primary">
                    {id ? "Update " : "Add "}Student
                </button>
            </form>
        </div>
    );
}
