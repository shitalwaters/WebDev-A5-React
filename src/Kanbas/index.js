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
import * as client from "./Courses/client";
import React, { useState, useEffect } from 'react';


function Kanbas() {
    const [courses, setCourses] = useState([]);
    const URL = "http://localhost:4000/api/courses";
    const findModulesForCourse = async () => {
      const response = await client.findModulesForCourse();
      setCourses(response);
    };
    useEffect(() => {
      findModulesForCourse();
    }, []);
  
  
    // const [courses, setCourses] = useState(db.courses); // old db method
    // Course
    if (courses.length > 1) {
      var id = courses[courses.length - 1]._id; // GET RS103
      id = Number(id.slice(2)) + 1; // GET 104
    }
    // console.log("init id" + id.toString())
  
    const [course, setCourse] = useState({
      // "_id": "RS101",
      "name": "",
      "number": "",
      "startDate": "2023-01-10",
      "endDate": "2023-05-15",
      "idNum": id
    });



    // ADD COURSE
    const createModule = async () => {
      const response = await client.createModule(course);
      setCourses([response, ...courses]);
      setCourse({ name: "" });
    };
    const deleteModule = async (course) => {
      const response = await client.deleteModule(course);
      setCourses(courses.filter(
        (c) => c._id !== course._id));
    };

    // UPDATE COURSE
  
    const updateCourse = async (course) => {
      const response = await client.createModule(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
      setCourse({ name: "" });
    };


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
