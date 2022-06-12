export default class ArgumentParser {
    constructor() {
    }

    static parse(args) {
        let result = {};
        for (let argument of args) {
            if (argument.startsWith('--')) {
                argument = argument.replace('--', '').split('=');
                result[argument[0]] = argument[1];
            }
        }
        return result;
    }
}
