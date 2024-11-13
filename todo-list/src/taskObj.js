export default class {
    constructor(name, complete=false) {
        this.name = name;
        this.complete = complete;
    }

    static toggleComplete() {
        this.complete = !this.complete;
    }
};