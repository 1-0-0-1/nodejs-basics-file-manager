import FilemanagerModule from "../FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";
import path from "path";

export default class Mv extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'mv';
    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && command.getArguments()[1]
            && fs.existsSync(command.getArguments()[0])
            && fs.existsSync(command.getArguments()[1]);
    }

    handle(command) {
        try {
            const pathToFile = command.getArguments()[0];
            const pathToNewDirectory = command.getArguments()[1];
            fs.renameSync(pathToFile, path.join(pathToNewDirectory, path.basename(pathToFile)));
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
