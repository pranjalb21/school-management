import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "../features/students/studentSlice";
import { teacherSlice } from "../features/teachers/teacherSlice";

const store = configureStore({
    reducer: {
        student: studentSlice.reducer,
        teacher: teacherSlice.reducer,
    },
});

export default store;
