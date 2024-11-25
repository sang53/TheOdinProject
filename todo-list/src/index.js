import "./style.css";

import {
  getProjects,
  saveProjects,
  removeProjectFromStorage,
  saveProjectInfo,
} from "./storageInterface.js";
import {
  addProjectToPage,
  setMainDate,
  removeProjectFromPage,
  getParentProjectName,
  removeTaskFromPage,
  toggleRemoveDefaults,
  setInputMinDate,
  addNewTaskInput,
  addTaskToProject,
} from "./DOMInterface.js";
import defaultProjects from "./defaultProjects.js";
import Project from "./projectObj.js";
import Task from "./taskObj.js";
import { sortAscDate } from "./DateConverter.js";

let projects;
const DIALOG = document.querySelector("dialog");
const FORM = DIALOG.querySelector("form");

initialise();

function initialise() {
  if (loadProjectstoArray()) toggleRemoveDefaults();
  projects.forEach(addProjectToPage);
  setMainDate();
  setInputMinDate();
}

// returns true if default projects are loaded
function loadProjectstoArray() {
  projects = getProjects();
  if (!projects) {
    projects = defaultProjects.slice();
    return true;
  }
}

document.addEventListener("click", clickHandler);

function clickHandler(event) {
  switch (event.target.className) {
    case "remove-defaults":
      defaultProjects.forEach(removeProject);
      toggleRemoveDefaults();
      break;
    case "project-add":
      DIALOG.showModal();
      break;
    case "project-remove":
      removeProject(getProjectByName(event.target.id));
      break;
    case "task-remove":
      removeTask(...getTaskObjByElement(event.target));
      break;
    case "task-add":
      addNewTaskInput();
      event.preventDefault();
      break;
    case "task-checkbox":
      toggleTaskComplete(
        ...getTaskObjByElement(event.target, event.target.id.slice(2)),
      );
      break;
    case "dialog-add":
      newProject();
      FORM.reset();
      DIALOG.close();
      break;
    case "dialog-cancel":
      FORM.reset();
      DIALOG.close();
      break;
    case "new-task-button":
      newTask(
        getProjectByName(getParentProjectName(event.target)),
        event.target.previousElementSibling.value,
      );
      event.target.previousElementSibling.value = "";
      break;
  }
}

function removeProject(project) {
  removeProjectFromPage(project);
  removeProjectFromArray(project);
  removeProjectFromStorage(project);
  saveProjects(projects);
}

function getTaskObjByElement(taskElement, taskName = null) {
  const project = getProjectByName(getParentProjectName(taskElement));
  if (taskName) return [project, project.tasks.get(taskName)];
  else return [project, project.tasks.get(taskElement.id)];
}

function removeTask(project, taskObj) {
  removeTaskFromPage(taskObj);
  removeTaskFromProject(project, taskObj);
  saveProjectInfo(project);
}

function removeTaskFromProject(project, taskObj) {
  project.tasks.delete(taskObj.name);
}

function getProjectByName(projectName) {
  return projects.find((project) => project.name === projectName);
}

function removeProjectFromArray(project) {
  projects.splice(
    projects.findIndex((element) => element === project),
    1,
  );
}

function newProject() {
  const project = new Project(
    FORM.querySelector("#input-name").value,
    FORM.querySelector("#input-description").value,
    FORM.querySelector("#input-date").value,
  );
  FORM.querySelectorAll(".input-task").forEach(function (element) {
    if (element.value)
      project.tasks.set(element.value, new Task(element.value));
  });
  updateProjects(project);
}

function updateProjects(project) {
  projects.forEach(removeProjectFromPage);
  projects.push(project);
  sortAscDate(projects);
  projects.forEach(addProjectToPage);
  saveProjects(projects);
  saveProjectInfo(project);
}

function toggleTaskComplete(project, taskObj) {
  taskObj.complete = !taskObj.complete;
  saveProjectInfo(project);
}

function newTask(project, taskName) {
  if (taskName) {
    const task = new Task(taskName);
    task.taskDiv = addTaskToProject(
      task,
      project.mainDiv.querySelector(".main-project"),
    );
    project.tasks.set(taskName, task);
    saveProjectInfo(project);
  }
}
