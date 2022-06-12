import FilemanagerModule from "../FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";

export default class Rm extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'rm';
    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && fs.existsSync(command.getArguments()[0]);
    }

    handle(command) {
        try {
            fs.unlinkSync(command.getArguments()[0]);
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
