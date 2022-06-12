import FilemanagerModule from "../FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";
import path from "path";

export default class Rn extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'rn';
    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && command.getArguments()[1]
            && fs.existsSync(command.getArguments()[0]);
    }

    handle(command) {
        try {
            const pathToFile = command.getArguments()[0];
            const newFilename = command.getArguments()[1];
            fs.renameSync(pathToFile, path.join(path.dirname(pathToFile), newFilename))
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
