import FilemanagerModule from "./FilemanagerModule.mjs";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";
import path from "path";

export default class Up extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'up';

    }

    isValidCommand(command) {
        return true;
    }

    handle(command) {
        try {
            const targetDir = path.normalize(path.join(process.cwd(), '..'));
            process.chdir(targetDir);
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
