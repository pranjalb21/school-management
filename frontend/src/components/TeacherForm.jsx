import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTeacher,
    fetchTeacherById,
    updateTeacher,
} from "../features/teachers/teacherSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function TeacherForm() {
    const { id } = useParams();
    const { error, status, selectedTeacher } = useSelector(
        (state) => state.teacher
    );
    const defaultData = {
        name: "",
        subject: "",
        age: 0,
        gender: "",
    };
    const genders = ["Male", "Female", "Others"];
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchTeacherById(id));
            const existingTeacher = {
                name: selectedTeacher.name,
                age: selectedTeacher.age,
                gender: selectedTeacher.gender || "",
                subject: selectedTeacher.subject || "",
            };
            setFormData(existingTeacher);
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
                name: "Please enter teacher name.",
            }));
        }
        if (formData.subject === "") {
            setErrors((prev) => ({
                ...prev,
                subject: "Please enter teacher name.",
            }));
        }
        if (parseInt(formData.age) < 1) {
            setErrors((prev) => ({
                ...prev,
                age: "Please enter teacher age.",
            }));
        }

        if (!genders.includes(formData.gender)) {
            setErrors((prev) => ({
                ...prev,
                gender: "Please select teacher gender.",
            }));
        }

        if (Object.keys(errors).length === 0) {
            if (id) {
                dispatch(
                    updateTeacher({
                        teacherId: selectedTeacher._id,
                        teacherData: {
                            name: formData.name,
                            age: parseInt(formData.age),
                            subject: formData.subject,
                            gender: formData.gender,
                        },
                    })
                );
                if (!error) {
                    setFormData(defaultData);
                    navigate("/teacher", { replace: true });
                }
            } else {
                dispatch(addTeacher(formData));
                if (!error) {
                    setFormData(defaultData);
                    navigate("/teacher", { replace: true });
                }
            }
        }
    };
    return (
        <div>
            {status === "loading" && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <h2>{id ? "Update " : "Add "} Teacher</h2>
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
                        <label htmlFor="subject" className="form-label">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="form-control"
                        />
                        {errors.subject && (
                            <p className="text-danger m-0">
                                * <small>{errors.subject}</small>
                            </p>
                        )}
                        {errors.grade && (
                            <p className="text-danger m-0">
                                * <small>{errors.grade}</small>
                            </p>
                        )}
                    </div>
                </div>
                <button className="btn btn-primary">
                    {id ? "Update " : "Add "}teacher
                </button>
            </form>
        </div>
    );
}
