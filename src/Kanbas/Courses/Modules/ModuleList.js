import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";

import { FaEllipsisV, FaRegCheckCircle, FaPlus, FaRegTrashAlt, FaRegEdit } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux";

import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";
import * as client from "../client";
// import { findModulesForCourse, createModule, deleteModule } from "../client";

function ModuleList() {
  const { courseId } = useParams();

  // get all module
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
      );
  }, [courseId]);


  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();

  // whether to show add module
  const [showAddModule, setShowAddModule] = useState(false);

  // async
  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  // async
  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <>
      <div className="d-flex flex-row wd-main-content">
        <div className="row"></div>
        <div class="row wd-main-content">
          <div class="col-12 wd-button-bar">
            <button class="btn wd-btn-gray float-end">< FaEllipsisV /></button>
            <button class="btn wd-btn-red float-end" onClick={() => setShowAddModule(!showAddModule)}><FaPlus /> Module</button>
            <div class="dropdown float-end">
              <button class="btn wd-btn-gray dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <FaRegCheckCircle className="wd-icon-green" /> Publish
                All
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Publish All</a></li>
                <li><a class="dropdown-item" href="#">Publish All Items and Modules</a></li>
                <li><a class="dropdown-item" href="#">Unpublish</a></li>
              </ul>
            </div>
            <button class="btn wd-btn-gray float-end">View Progress</button>
            <button class="btn wd-btn-gray float-end" onclick="window.location.href='#';">Collapse
              All</button>
          </div>

          {
            modules
              .filter((module) => module.course === courseId)
              .map((module, index) => (
                <ul className="list-group wd-course-ul">
                  <li key={index} className="list-group-item list-group-item-secondary">
                    <div className="wd-module-title">
                      {module.name}
                      <button className="float-end btn wd-btn-transparent-module"
                        onClick={() => handleDeleteModule(module._id)}>
                        <FaRegTrashAlt />
                      </button>
                      <button className="float-end btn wd-btn-transparent-module"
                        onClick={() => {
                          setShowAddModule(true);
                          dispatch(setModule(module))
                        }}>
                        <FaRegEdit />
                      </button>
                    </div>
                  </li>
                  <li key={index} className="list-group-item">
                    <p>{module.description}</p>
                  </li>
                </ul>
              ))
          }
        </div>
        {showAddModule && <div className="wd-add-module">
          {/***  Add Module Form ****/}
          Module Name
          <input
            value={module.name} placeholder="Module Name"
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            } />
          <br />
          Description
          <br />
          <textarea
            value={module.description} placeholder="Description"
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            } />
          <button className="btn wd-btn-gray"
            onClick={handleAddModule}>
            Add
          </button>
          <button className="btn wd-btn-gray"
            onClick={handleUpdateModule}>
            Update
          </button>
        </div>}
      </div>
    </>);
}
export default ModuleList;