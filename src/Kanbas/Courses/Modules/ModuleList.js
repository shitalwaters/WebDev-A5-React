import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEllipsisV, FaRegCheckCircle, FaPlus, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import './moduleList.css';

import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";




function ModuleList() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const [showAddModule, setShowAddModule] = useState(false);

  // Fetch modules for a course
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE}/courses/${courseId}/modules`);
        dispatch(setModules(response.data));
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, [courseId, dispatch]);

  // Add a module
  const handleAddModule = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/courses/${courseId}/modules`, module);
      dispatch(addModule(response.data));
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  // Delete a module
  const handleDeleteModule = async (moduleId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/modules/${moduleId}`);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  // Update a module
  const handleUpdateModule = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE}/modules/${module._id}`, module);
      dispatch(updateModule(module));
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  return (
    <>
      <div className="module-container">
        <div className="row wd-main-content">
          <div className="col-12 wd-button-bar">
            <button className="btn wd-btn-gray float-end"><FaEllipsisV /></button>
            <button className="btn wd-btn-red" onClick={() => setShowAddModule(!showAddModule)}><FaPlus /> Module</button>
            <div className="dropdown float-end">
              <button className="btn wd-btn-gray dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaRegCheckCircle className="wd-icon-green" /> Publish All
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Publish All</a></li>
                <li><a className="dropdown-item" href="#">Publish All Items and Modules</a></li>
                <li><a className="dropdown-item" href="#">Unpublish</a></li>
              </ul>
            </div>
            <button className="btn wd-btn-gray">View Progress</button>
            <button className="btn wd-btn-gray" onClick={() => {/* Collapse All logic */}}>Collapse All</button>
          </div>

          {modules
            .filter((mod) => mod.course === courseId)
            .map((mod, index) => (
              <div key={index} className="list-group">
                <div className="list-group-item list-group-item-secondary">
                  <div className="wd-module-title">
                    {mod.name}
                    <button className="float-end btn wd-btn-transparent-module" onClick={() => handleDeleteModule(mod._id)}>
                      <FaRegTrashAlt />
                    </button>
                    <button className="float-end btn wd-btn-transparent-module" onClick={() => {setShowAddModule(true); dispatch(setModule(mod))}}>
                      <FaRegEdit />
                    </button>
                  </div>
                </div>
                <div className="list-group-item">
                  <p>{mod.description}</p>
                </div>
              </div>
            ))
          }
        </div>
         {showAddModule && (
        <div className="wd-add-module">
          Module Name
          <input
            value={module.name} // Replaced moduleDetails with module
            placeholder="Module Name"
            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
          />
          <br />
          Description
          <br />
          <textarea
            value={module.description} // Replaced moduleDetails with module
            placeholder="Description"
            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
          />
          <button className="btn wd-btn-gray" onClick={handleAddModule}>Add</button>
          <button className="btn wd-btn-gray" onClick={handleUpdateModule}>Update</button>
        </div>
        )}
      </div>
    </>
  );
}

export default ModuleList;