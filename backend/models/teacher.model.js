const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    age: Number,
    gender: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
