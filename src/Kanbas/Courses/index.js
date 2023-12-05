import React from 'react';
import Database from "../Database";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/AssignmentEditor';
import "./index.css"

function Courses() {
    const location = useLocation();
    const { courseId } = useParams();
    const course = Database.courses.find((course) => course._id === courseId);

    const getActiveLinkName = () => {

        const paths = location.pathname.split('/').filter(Boolean); 
  
        if (paths.length && ["Home", "Modules", "Assignments", "Grades"].includes(paths[paths.length - 1])) {
            return paths[paths.length - 1]; 
        }
        return ""; 
    };

    if (!course) {
        return <div>Course not found</div>;
    }
        const activeLinkName = getActiveLinkName();
    return (
        <div className="course-container">
        <h1>{course.name} {activeLinkName && ` - ${activeLinkName}`}</h1>
        <div className="breadcrumb-container">
          <div className="breadcrumb-line"></div>
        </div>
        <CourseNavigation />
        <div>
        <div
        
        className="overflow-y-scroll position-fixed bottom-0 end-0"
        style={{
        left: "320px",
        top: "50px",
        }}

        
        >
        <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="Home" element={<Home/>} />
        <Route path="Home" element={<h1>Home</h1>} />
        <Route path="Modules" element={<Modules/>} />
        <Route path="Assignments" element={<Assignments/>} />
        <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
        <Route path="Grades" element={<h1>Grades</h1>} />
        </Routes>
        </div>
        </div>
        </div>
        );
        }
        export default Courses;
