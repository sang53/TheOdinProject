import { jsonify, unjsonify } from "./JSONConverter";

export function getProjects() {
    let projectNameArray = unjsonify(localStorage.getItem("projects"));
    if (!projectNameArray) return false // if no projects have been saved
    else {
        return projectNameArray.map((projectName) => getProjectInfo(projectName)); // return array of all saved Project objects
    }
}   

function getProjectInfo(projectName) {
    return unjsonify(localStorage.getItem(projectName));
}

export function saveProjects(projects) {
    let projectNames = projects.map((project) => project.name);
    localStorage.setItem("projects", jsonify(projectNames));
}

export function saveProjectInfo(project) {
    localStorage.setItem(project.name, jsonify(project));
}

export function removeProjectFromStorage(project) {
    localStorage.removeItem(project.name);
}