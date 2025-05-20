import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../constants/constants";

export const fetchStudents = createAsyncThunk(
    "students/fetch",
    async ({ gender, sortBy }, { rejectWithValue }) => {
        try {
            let key = "";
            if (gender) key += `&gender=${gender}`;
            if (sortBy) key += `&sortBy=${sortBy}`;

            const response = await axios.get(`${base_url}/students?${key}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const fetchStudentById = createAsyncThunk(
    "students/fetchById",
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${base_url}/students/${studentId}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addStudent = createAsyncThunk(
    "students/add",
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_url}/students`,
                studentData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "students/delete",
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${base_url}/students/${studentId}`
            );

            return response.data.student;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateStudent = createAsyncThunk(
    "students/update",
    async ({ studentId, studentData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${base_url}/students/${studentId}`,
                studentData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const studentSlice = createSlice({
    name: "student",
    initialState: {
        students: [],
        selectedStudent: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success";
            state.students = action.payload;
        });
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to fetch students.";
        });
        builder.addCase(fetchStudentById.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchStudentById.fulfilled, (state, action) => {
            state.status = "success";
            state.selectedStudent = action.payload;
        });
        builder.addCase(fetchStudentById.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to fetch students.";
        });
        builder.addCase(addStudent.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.status = "success";
            state.students.push(action.payload);
        });
        builder.addCase(addStudent.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add student.";
        });
        builder.addCase(deleteStudent.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.status = "success";
            state.students = state.students.filter(
                (student) => student._id !== action.payload._id
            );
        });
        builder.addCase(deleteStudent.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add student.";
        });
        builder.addCase(updateStudent.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.status = "success";

            // Ensure student exists before updating
            state.students = state.students.map((student) =>
                student._id === action.payload._id
                    ? { ...student, ...action.payload }
                    : student
            );
        });

        builder.addCase(updateStudent.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add student.";
        });
    },
});

export default studentSlice.reducer;
