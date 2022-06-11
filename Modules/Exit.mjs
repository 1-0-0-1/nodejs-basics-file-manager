import FilemanagerModule from "./FilemanagerModule.mjs";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";

export default class Exit extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === '.exit';
    }

    isValidCommand(command) {
        return true;
    }

    handle(command) {
        try {
            this.filemanager.exit();
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
