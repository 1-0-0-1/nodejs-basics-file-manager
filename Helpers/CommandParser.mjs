import Command from "../Command.mjs";

export default class CommandParser {
    constructor() {
    }

    static parse(args) {
        args = args.split(' ');
        return new Command(args.shift(), args);
    }
}
