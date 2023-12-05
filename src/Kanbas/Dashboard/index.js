import { React, useState } from "react";
import Database from '../Database';
import blueSolid from '../../blueSolid.jpg';
import { Link } from 'react-router-dom';
import "./index.css";

function Dashboard() {
    const [courses, setCourses] = useState(Database.courses);
    const [course, setCourse] = useState({
      name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      });

    {/* Update Course */}
    const updateCourse = () => {
      setCourses(courses.map((c) => {
          if (c._id === course._id) {
              return {...course}; // Spread operator to avoid direct mutation
          } else {
              return c;
          }
      }));
  };

  {/* Edit Course */}
  const editCourse = (selectedCourse) => {
      setCourse({...selectedCourse}); // Use spread operator to avoid direct mutation
  };

{/* Add New Course*/}
      const addNewCourse = () => {setCourses([...courses,{ ...course,
      _id: new Date().getTime() }]);
      };

{/* Delete Course*/}
      const deleteCourse = (courseId) => {
        setCourses(courses.filter((course) => course._id !== courseId));
        };


    return (
        <div className="main-container"> 
            
            <div className="content-area col-md-8"> {/* Main content area */}
                <h1>Dashboard</h1>
                
                <div className="page-header"></div>
                
                <h2>Published Courses</h2>

                
                <div className="d-flex flex-row flex-wrap">
                    {courses.map(course => (
                        <div key={course.number} className="m-3" style={{ flex: '1 0 calc(25% - 24px)', maxWidth: 'calc(25% - 24px)' }}>
                            <div className="card">
                                <img className="card-img-top" src={blueSolid} alt="Course Image" />
                                <Link key={course.number} to={`/Kanbas/Courses/${course.number}`} className="list-group-item">
                                    {course.name}
                                    <p className="card-text">{course.number} </p>
                                    <p className="card-text">{course.startDate} to {course.endDate}</p>

                                    <button
                                      onClick={(event) => {event.preventDefault();setCourse(course);
                                      }}>
                                      Edit
                                      </button>

                                    <button
                                      onClick={(event) => {event.preventDefault();deleteCourse(course._id);
                                      }}>
                                      Delete
                                    </button>
                                    

                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
{/* Sidebar */}
            <div className="sidebar col-md-4"> 
            <button onClick={addNewCourse} > Add </button>
            <button onClick={updateCourse} >
Update
</button>
                
              <h5>Course</h5>
              <input value={course.name} className="form-control"
                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

                <input value={course.number} className="form-control"
                onChange={(e) => setCourse({ ...course, number: e.target.value }) } />

                <input value={course.startDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>

                <input value={course.endDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
            </div>

        </div>
    );
}

export default Dashboard;
