export default class {
    constructor(name, description, deadline, tasks = new Map()) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.tasks = tasks;
    }

    static addTask(task) {
        this.tasks.set(task.name, task);
    }

    static removeTask(taskName) {
        const task = this.tasks.get(taskName);
        this.tasks.delete(taskName);
        return task;
    }
};