import FilemanagerModule from "./FilemanagerModule.mjs";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";
import fs from "fs";

export default class Ls extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'ls';

    }

    isValidCommand(command) {
        return true;
    }

    handle(command) {
        try {
            let files = fs.readdirSync(process.cwd())
            for (let file of files) {
                this.writeln(`\t${file}`);
            }
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
