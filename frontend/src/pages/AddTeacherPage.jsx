import TeacherForm from "../components/TeacherForm";
import { documentTitle } from "../constants/constants";

export default function AddTeacherPage() {
    document.title = `${documentTitle} | Add Teacher`;

    return (
        <main className="container mt-3">
            <TeacherForm />
        </main>
    );
}
