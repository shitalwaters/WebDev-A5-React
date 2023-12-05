import React from "react";
import { Link, useParams } from "react-router-dom";
import Database from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./index.css"

function Assignments() {
    const { courseId } = useParams();
    const assignments = Database.assignments;
    const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId);


    return (
        <div>
            <h2 className="assignment-title">Assignments for course {courseId}</h2>
            
            <div className="assignment-group">
                {courseAssignments.map((assignment) => (
                    <Link
                        key={assignment._id}
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="assignment-group-item">
                        {assignment.title}

                        <div>
                            <FontAwesomeIcon className="fa-icon" icon={faCheckCircle} style={{ color: 'green' }} aria-hidden="true" />
                            <FontAwesomeIcon className="fa-icon" icon={faEllipsisV} style={{ color: 'grey' }} aria-hidden="true" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default Assignments;

