import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Database from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./moduleList.css";
import { useSelector, useDispatch } from "react-redux";
import {
addModule,
deleteModule,
updateModule,
setModule,
} from "./modulesReducer";

function ModuleList() {
    const { courseId } = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <ul className="list-group">
            <li className="list-group-item">
            <button onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                Add
            </button>
           <button onClick={() => dispatch(updateModule(module))}>
           Update
</button>
            <input value={module.name}
            onChange={(e) => 
                dispatch(setModule({ ...module, name: e.target.value }))
            }/>
            <textarea value={module.description}
            onChange={(e) => 
                dispatch(setModule({ ...module, description: e.target.value }))
}/>
            </li>
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="module-group-item d-flex justify-content-between align-items-center">
                        <button
                            onClick={() => dispatch(deleteModule(module._id))}>
                            Delete
                            </button>
                            <button
                            onClick={() => dispatch(setModule(module))}>
                            Edit
                        </button>
                        <div>
                            <h3>{module.name}</h3>
                            <p>{module.description}</p>
                        </div>
                        <div>
                        <FontAwesomeIcon className="fa-icon" icon={faCheckCircle} style={{ color: 'green' }} aria-hidden="true" />
                        <FontAwesomeIcon className="fa-icon" icon={faPlus} aria-hidden="true" />
                        <FontAwesomeIcon className="fa-icon" icon={faEllipsisV} aria-hidden="true" />

                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default ModuleList;
