import { convertTimeToString, convertDate, getInputMinDate } from "./DateConverter";

const SIDEBAR = document.querySelector("#sidebar-projects");
const MAIN = document.querySelector("#main");
const NEWTASKBUTTON = document.querySelector(".task-add");

export function addProjectToPage(project) {
    const projectDeadline = convertTimeToString(project.deadline);
    project.mainDiv = addProjectToMain(project, projectDeadline);
    project.sidebarDiv = addProjectToSidebar(project.name, projectDeadline);
}

function addProjectToSidebar(projectName, projectDeadline) {
    const project = document.querySelector(".sidebar-project").cloneNode(true);
    project.querySelector(".sidebar-project-title").innerText = projectName;
    project.querySelector(".sidebar-project-time").innerText = projectDeadline;
    project.classList.toggle("hidden");
    SIDEBAR.appendChild(project);
    return project;
}

function addProjectToMain(project, projectDeadline) {
    const projectDiv = document.querySelector(".main-cell").cloneNode(true);
    projectDiv.querySelector(".main-deadline").innerText = projectDeadline;
    projectDiv.querySelector(".project-title").innerText = project.name;
    projectDiv.querySelector(".project-description").innerText = `-- ${project.description}`;
    projectDiv.querySelector(".project-remove").id = project.name;

    for (let taskObj of project.tasks.values()) {
        taskObj.taskDiv = addTaskToProject(taskObj, projectDiv.querySelector(".main-project"));
    }
    
    projectDiv.classList.toggle("hidden");
    MAIN.appendChild(projectDiv);
    return projectDiv;
}

export function addTaskToProject(taskObj, projectDiv) {
    const taskDiv = projectDiv.querySelector(".project-task").cloneNode(true);

    taskDiv.querySelector(".task-name").textContent = taskObj.name;
    taskDiv.classList.toggle("hidden");

    const checkbox = taskDiv.querySelector("input.task-checkbox");
    checkbox.id = "c-" + taskObj.name;
    if (taskObj.complete) checkbox.checked = true;

    taskDiv.querySelector("label.task-label").setAttribute("for", "c-" + taskObj.name);

    taskDiv.querySelector(".task-remove").id = taskObj.name;
    projectDiv.appendChild(taskDiv);
    return taskDiv;
}

export function setMainDate() {
    document.querySelector("#main-date").textContent = convertDate(new Date());
}

export function removeProjectFromPage(project) {
    project.mainDiv.remove();
    project.sidebarDiv.remove();
}

export function getParentProjectName(taskElement) {
    let node = taskElement.parentNode;
    while (node.className !== "main-cell") {
        node = node.parentNode;
    }
    return node.querySelector(".project-remove").id;
}

export function removeTaskFromPage(task) {
    task.taskDiv.remove();
}

export function toggleRemoveDefaults() {
    document.querySelector(".remove-defaults").classList.toggle("hidden");
}

export function setInputMinDate() {
    const inputDate = document.querySelector("#input-date")
    const todayDate = getInputMinDate();
    inputDate.min = todayDate;
    inputDate.value = todayDate;
}

export function addNewTaskInput() {
    const newTaskInput = document.querySelector(".input-task").cloneNode();
    newTaskInput.value = "";
    NEWTASKBUTTON.before(newTaskInput);
}