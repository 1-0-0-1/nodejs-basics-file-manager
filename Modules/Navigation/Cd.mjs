import FilemanagerModule from "../FilemanagerModule.mjs";
import OperationFailedException from "../../Exceptions/OperationFailedException.mjs";
import path from "path";

export default class Cd extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'cd';

    }

    isValidCommand(command) {
        return command.getArguments()[0];
    }

    handle(command) {
        try {
            const targetDir = path.normalize(path.join(process.cwd(), command.getArguments()[0]));
            process.chdir(targetDir);
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
