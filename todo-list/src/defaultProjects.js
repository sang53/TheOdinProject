import Project from "./projectObj.js";
import Task from "./taskObj.js";
import { nextMonday } from "date-fns";

const ENDOFTODAY = new Date();
ENDOFTODAY.setHours(23, 59, 59);

const NEXTMONDAY = nextMonday(new Date());

const tasks1 = [
    new Task("Walk the dog", true),
    new Task("Feed the dog", false),
    new Task("Shower the dog", false),
];

const tasks2 = [
    new Task("Wash the dishes", false),
    new Task("Clean the room", true),
    new Task("Make the bed", true),
    new Task("Water the plant", false),
]

const taskMap1 = new Map();
tasks1.forEach((task) => taskMap1.set(task.name, task));

const taskMap2 = new Map();
tasks2.forEach((task) => taskMap2.set(task.name, task));

export default [
    new Project("Take care of the dog", "Make sure the dog is chilling", ENDOFTODAY, taskMap1),
    new Project("Do the chores", "Let's do all the chores!", NEXTMONDAY, taskMap2),
];
