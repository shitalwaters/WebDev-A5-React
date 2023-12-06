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
import axios from "axios";
import React, { useState, useEffect } from 'react';

function Kanbas() {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({
        "name": "",
        "number": "",
        "startDate": "2023-01-10",
        "endDate": "2023-05-15",
        "idNum": null
    });

    // Function to find modules for a course
    const findModulesForCourse = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE}/modules`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    // Function to create a module
    const createModule = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE}/modules`, course);
        setCourses([response.data, ...courses]);
        setCourse({ name: "" });
      } catch (error) {
        console.error("Error creating module:", error);
      }
    };

    // Function to delete a module
    const deleteModule = async (courseId) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE}/modules/${courseId}`);
        setCourses(courses.filter(c => c._id !== courseId));
      } catch (error) {
        console.error("Error deleting module:", error);
      }
    };

    // Function to update a course
    const updateCourse = async (updatedCourse) => {
      try {
        await axios.put(`${process.env.REACT_APP_API_BASE}/courses/${updatedCourse._id}`, updatedCourse);
        setCourses(courses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
      } catch (error) {
        console.error("Error updating course:", error);
      }
    };

    // Fetch modules when component mounts
    useEffect(() => {
      findModulesForCourse();
    }, []);

    // Calculate ID for new course
    useEffect(() => {
      if (courses.length > 1) {
        const id = Number(courses[courses.length - 1]._id.slice(2)) + 1;
        setCourse(prevCourse => ({ ...prevCourse, idNum: id }));
      }
    }, [courses]);

    return (
        <Provider store={store}>
        <div className="d-flex">
            <KanbasNavigation />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account" element={<h1>Account</h1>} />
                    <Route path="Dashboard" element={<Dashboard 
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            updateCourse={updateCourse} />} />
                    <Route path="Courses" element={<CourseNavigation />} />
                    <Route path="Courses/Home" element={<h1>Home</h1>} />
                    <Route path="Courses/Modules" element={<Modules/>} />
                    <Route path="Assignments" element={<Assignments/>} />
                    <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
                    <Route path="Grades" element={<h1>Grades</h1>} />
                    <Route path="Courses/:courseId/*" element={<Courses />} />
                </Routes>
            </div>
        </div>
        </Provider>
    );
}

export default Kanbas;
