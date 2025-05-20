import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../constants/constants";

export const fetchTeachers = createAsyncThunk(
    "teachers/fetch",
    async ({ gender, subject }, { rejectWithValue }) => {
        try {
            let key = "";
            if (gender) key += `&gender=${gender}`;
            if (subject) key += `&subject=${subject}`;

            const response = await axios.get(`${base_url}/teachers?${key}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const fetchTeacherById = createAsyncThunk(
    "teachers/fetchById",
    async (teacherId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${base_url}/teachers/${teacherId}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addTeacher = createAsyncThunk(
    "teachers/add",
    async (teacherData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${base_url}/teachers`,
                teacherData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTeacher = createAsyncThunk(
    "teachers/delete",
    async (teacherId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${base_url}/teachers/${teacherId}`
            );

            return response.data.teacher;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateTeacher = createAsyncThunk(
    "teachers/update",
    async ({ teacherId, teacherData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${base_url}/teachers/${teacherId}`,
                teacherData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const teacherSlice = createSlice({
    name: "teacher",
    initialState: {
        teachers: [],
        selectedTeacher: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            state.status = "success";
            state.teachers = action.payload;
        });
        builder.addCase(fetchTeachers.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to fetch teachers.";
        });
        builder.addCase(fetchTeacherById.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchTeacherById.fulfilled, (state, action) => {
            state.status = "success";
            state.selectedTeacher = action.payload;
        });
        builder.addCase(fetchTeacherById.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to fetch teachers.";
        });
        builder.addCase(addTeacher.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addTeacher.fulfilled, (state, action) => {
            state.status = "success";
            state.teachers.push(action.payload);
        });
        builder.addCase(addTeacher.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add teacher.";
        });
        builder.addCase(deleteTeacher.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteTeacher.fulfilled, (state, action) => {
            state.status = "success";
            state.teachers = state.teachers.filter(
                (teacher) => teacher._id !== action.payload._id
            );
        });
        builder.addCase(deleteTeacher.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add teacher.";
        });
        builder.addCase(updateTeacher.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateTeacher.fulfilled, (state, action) => {
            state.status = "success";

            // Ensure teacher exists before updating
            state.teachers = state.teachers.map((teacher) =>
                teacher._id === action.payload._id
                    ? { ...teacher, ...action.payload }
                    : teacher
            );
        });

        builder.addCase(updateTeacher.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to add teacher.";
        });
    },
});

export default teacherSlice.reducer;
