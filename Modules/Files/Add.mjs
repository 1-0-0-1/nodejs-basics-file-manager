import FilemanagerModule from "../FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";
import path from "path";

export default class Add extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'add';
    }

    isValidCommand(command) {
        return command.getArguments()[0];
    }

    handle(command) {
        try {
            const dstFilename = path.join(process.cwd(), command.getArguments()[0]);
            const file = fs.createWriteStream(dstFilename)
            file.close();
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
