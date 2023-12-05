import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import CourseNavigation from "./Courses/CourseNavigation";
import Modules from "./Courses/Modules";
import Assignments from "./Courses/Assignments";
import AssignmentEditor from "./Courses/Assignments/AssignmentEditor";
import store from "./store";
import { Provider } from "react-redux";

function Kanbas() {
    return (
        <Provider store={store}>
        <div className="d-flex">
            <KanbasNavigation />
            <div>
                
            <Routes>
    <Route path="/" element={<Navigate to="Dashboard" />} />
    <Route path="Account" element={<h1>Account</h1>} />
    <Route path="Dashboard" element={<Dashboard />} />
    <Route path="Courses" element={<CourseNavigation />} /> {/* General Courses Page */}
    <Route path="Courses/Home" element={<h1>Home</h1>} />{/* General Home Page */}
    <Route path="Courses/Modules" element={<Modules/>} />
    <Route path="Assignments" element={<Assignments/>} />
    <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
    <Route path="Grades" element={<h1>Grades</h1>} />
    <Route path="Courses/:courseId/*" element={<Courses />} /> {/* Specific Course Page */}

</Routes>

            </div>
        </div>
        </Provider>
    );
}
export default Kanbas;
