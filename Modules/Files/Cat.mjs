import FilemanagerModule from "../FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";

export default class Cat extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'cat';
    }

    isValidCommand(command) {
        return command.getArguments()[0];
    }

    handle(command) {
        try {
            const pathToFile = command.getArguments()[0];
            this.writeln(fs.readFileSync(pathToFile, {encoding: 'utf-8'}));
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
