import db from "../../Kanbas/Database";
import { useParams, Link, useLocation, Navigate, Route, Routes, } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import "./index.css";
import { FaBars } from "react-icons/fa"
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import * as client from "./client";

function Courses() {
    const { courseId } = useParams();
    const { pathname } = useLocation();

    // const course = db.courses.find((course) => course._id === courseId);
    // const course = courses.find((course) => course._id === courseId);
    const [course, setCourse] = useState({});
    const URL = `${process.env.REACT_APP_API_BASE}/courses`;
    // const findCourseById = async (courseId) => {
    //     const response = await axios.get(
    //         `${URL}/${courseId}`
    //     );
    //     setCourse(response.data);
    // };
    const findCourseById = async (courseId) => {
        const response = await client.findCourseById(courseId);
        // console.log(JSON.stringify(response))
        setCourse(response);
    };
    useEffect(() => {
        findCourseById(courseId);
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
        // <>
        // <pre>{JSON.stringify(courses, null, 2)}</pre>
        // ------------
        // <pre>{JSON.stringify(course, null, 2)}</pre>
        // </>
        <>
            <div class="wd-course-mobile-header d-block d-md-none">
                <div class="row">
                    <div class="col-auto text-center">
                        {/* <a href="/kanbas/kanbas-nav.html"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a> */}
                        <FaBars style={{ marginInlineEnd: 20 }} />
                    </div>
                    <div class="col text-center">
                        CS5610.11550.202410 <br />
                        Home
                    </div>
                    <div class="col-auto">
                        👓   <a href="/kanbas/course-nav.html"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
            <div>
                <div class="wd-profile-header d-none d-md-block">
                    <div class="row">
                        <div class="col-auto">
                            <Link className="wd-hyperlink" index="bars" to={pathname}>
                                <FaBars style={{ marginInlineEnd: 20 }} />
                            </Link>
                        </div>
                        <div class="col">
                            <nav className="wd-course-nav" aria-label="breadcrumb">
                                <ol class="breadcrumb wd-breadcrumb">
                                    <li class="breadcrumb-item">
                                        <Link key="course1" to={pathname} className="wd-hyperlink">
                                            {course.name}
                                        </Link>
                                    </li>
                                    {breadCrumbs.map((breadCrumb, index) => {
                                        return (
                                            <li class="breadcrumb-item">
                                                {breadCrumb}
                                            </li>)
                                    })}
                                </ol>
                            </nav>
                        </div>
                        <div class="col-auto">
                            <button class="btn wd-btn-gray float-end">👓 Student View</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wd-flex-row-container">
                <CourseNavigation />
                <div class="wd-flex-grow-1">
                    <div
                        // className="overflow-y-scroll position-fixed bottom-0 end-0"
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

        </>
    );
}
export default Courses;

// <div className="list-group wd-kanbas-navigation" style={{ width: 150 }}>