import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Database from "../../../Database";
import "./index.css";

function AssignmentEditor() {
    const { assignmentId, courseId } = useParams();
    const navigate = useNavigate();

    // Find the assignment in database
    const assignment = Database.assignments.find(a => a._id === assignmentId);

    // States for each of the editable properties of the assignment
    const [assignmentName, setAssignmentName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    const [group, setGroup] = useState('');
    const [gradeAs, setGradeAs] = useState('');
    const [submissionType, setSubmissionType] = useState('');
    const [submissionAttempts, setSubmissionAttempts] = useState('');
    const [groupAssignment, setGroupAssignment] = useState(false);
    const [assignTo, setAssignTo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [availableFromDate, setAvailableFromDate] = useState('');
    const [untilDate, setUntilDate] = useState('');

    // Effect hook to set state when the component mounts or when assignment changes
    useEffect(() => {
        if (assignment) {
            setAssignmentName(assignment.title);
            setDescription(assignment.description);
            // Initialize other states with values from the assignment here
            // setPoints(assignment.points);

        }
    }, [assignment]);

     {/* Save logic */}
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    return (
        <div className="container mt-3">
            <h2 className="assignmentEditor-title mb-3">Edit Assignment</h2>

            {/* Assignment Name */}
            <div className="form-group">
                <label className="font-weight-bold">Assignment Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                />
            </div>

            {/* Description */}
            <div className="form-group">
                <label className="font-weight-bold">Description</label>
                <textarea
                    className="form-control"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Points */}
            <div className="form-group">
                <label className="font-weight-bold">Points</label>
                <input
                    type="text"
                    className="form-control"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />
            </div>

            {/* Group */}
            <div className="form-group">
                <label className="font-weight-bold">Group</label>
                <select
                    className="form-control"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    <option value="Assignments">Assignments</option>
                 
                </select>
            </div>

            {/* Grade As */}
            <div className="form-group">
                <label className="font-weight-bold">Grade as</label>
                <select
                    className="form-control"
                    value={gradeAs}
                    onChange={(e) => setGradeAs(e.target.value)}
                >
                    <option value="percentage">Percentage</option>
               
                </select>
            </div>

            {/* Submission Type */}
            <div className="form-group">
                <label className="font-weight-bold">Submission Type</label>
                <select
                    className="form-control"
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                >
                    <option value="Online">Online</option>
                    
                </select>
            </div>

            {/* Submission Attempts */}
            <div className="form-group">
                <label className="font-weight-bold">Submission Attempts</label>
                <select
                    className="form-control"
                    value={submissionAttempts}
                    onChange={(e) => setSubmissionAttempts(e.target.value)}
                >
                    <option value="unlimited">Unlimited</option>
                  
                </select>
            </div>

            {/* Group Assignment */}
            <div className="form-group">
                <label className="font-weight-bold">Group Assignment</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={groupAssignment}
                        onChange={(e) => setGroupAssignment(e.target.checked)}
                    />
                    <label className="form-check-label">This is a group assignment</label>
                </div>
            </div>

            {/* Assign To */}
            <div className="form-group">
                <label className="font-weight-bold">Assign to</label>
                <input
                    type="text"
                    className="form-control"
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                />
            </div>

            {/* Due */}
            <div className="form-group">
                <label className="font-weight-bold">Due</label>
                <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            {/* Available From */}
            <div className="form-group">
                <label className="font-weight-bold">Available from</label>
                <input
                    type="date"
                    className="form-control"
                    value={availableFromDate}
                    onChange={(e) => setAvailableFromDate(e.target.value)}
                />
            </div>

            {/* Until */}
            <div className="form-group">
                <label className="font-weight-bold">Until</label>
                <input
                    type="date"
                    className="form-control"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                />
            </div>

            {/* Buttons at the bottom */}
            <div className="form-group d-flex justify-content-center mt-4">
                <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger me-2">
                    Cancel
                </Link>
                <button onClick={handleSave} className="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    );
}

export default AssignmentEditor;
