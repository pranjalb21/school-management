const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { Student } = require("./models/students.model");
const { initializeDatabase } = require("./db/db.config");
const Teacher = require("./models/teacher.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello, This is school management app!");
});

app.get("/students", async (req, res) => {
    try {
        const { gender, sortBy } = req.query;
        let filter = {};

        // Filter by gender if provided
        if (gender) {
            filter.gender = gender;
        }
        const sortValue = sortBy === "name" ? 1 : -1;
        const students = await Student.find(filter).sort({
            [sortBy]: sortValue,
        });

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const students = await Student.findById(id);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/students", async (req, res) => {
    const { name, age, grade, gender } = req.body;

    try {
        const student = new Student({ name, age, grade, gender });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.patch("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    const updatedStudentData = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            updatedStudentData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;

    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/teachers", async (req, res) => {
    const { name, subject, age, gender } = req.body;

    try {
        const teacher = new Teacher({ name, subject, age, gender });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/teachers", async (req, res) => {
    try {
        const { gender, subject } = req.query;
        let filter = {};

        // Filter by gender if provided
        if (gender) {
            filter.gender = gender;
        }
        if (subject) {
            filter.subject = subject;
        }
        const teachers = await Teacher.find(filter);

        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/teachers/:id", async (req, res) => {
    const teacherId = req.params.id;

    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        res.status(200).json({
            message: "Teacher deleted successfully",
            teacher: deletedTeacher,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.patch("/teachers/:id", async (req, res) => {
    const teacherId = req.params.id;
    const updatedTeacherData = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            updatedTeacherData,
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/teachers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const teachers = await Teacher.findById(id);
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
