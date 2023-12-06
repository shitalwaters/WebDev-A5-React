import { useParams, Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import "./index.css";
import { FaBars } from "react-icons/fa";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
    const { courseId } = useParams();
    const { pathname } = useLocation();

    const [course, setCourse] = useState({});

    // Function to find course by ID
    const findCourseById = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE}/courses/${id}`);
            setCourse(response.data);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };

    useEffect(() => {
        if (courseId) {
            findCourseById(courseId);
        }
    }, [courseId]);

    let breadCrumbs = [];
    if (pathname.includes("Home")) {
        breadCrumbs.push("Home");
    } else if (pathname.includes("Assignment")) {
        breadCrumbs.push("Assignment");
        if (pathname.includes("Edit")) {
            breadCrumbs.push("Edit");
        }
    } else if (pathname.includes("Modules")) {
        breadCrumbs.push("Modules");
    } else if (pathname.includes("Grades")) {
        breadCrumbs.push("Grades");
    } else if (pathname.includes("Settings")) {
        breadCrumbs.push("Settings");
    }

    return (
        <>
          
            <div class="wd-flex-row-container">
                <CourseNavigation />
                <div class="wd-flex-grow-1">
                    <div style={{ left: "320px", top: "50px" }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                            <Route path="Grades" element={<h1>Grades</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;
