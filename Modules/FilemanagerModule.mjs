import os from "os";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";

export default class FilemanagerModule {
    filemanager = undefined;

    constructor(filemanager) {
        this.filemanager = filemanager;
    }

    isSupport(command) {
        return false;
    }

    isValidCommand(command) {
        return false;
    }

    handle(command) {
        try {
            this.filemanager.exit();
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }

    writeln(message) {
        this.filemanager.readlineInterface.write(`${message}${os.EOL}`)
    }
}
