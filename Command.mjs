export default class Command {
    name = undefined;
    args = {}

    constructor(name, args) {
        this.name = name;
        this.args = args;
    }

    getName() {
        return this.name;
    }

    getArguments() {
        return this.args;
    }
}
