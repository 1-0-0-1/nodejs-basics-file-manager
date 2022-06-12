import FilemanagerModule from "./FilemanagerModule.mjs";
import crypto from "crypto";
import fs from "fs";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";

export default class Hash extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'hash';
    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && fs.existsSync(command.getArguments()[0]);
    }

    handle(command) {
        try {
            const filename = command.getArguments()[0];
            const fileData = fs.readFileSync(filename)
            const hash = crypto.createHash('SHA256').update(fileData).digest('hex');
            this.writeln(`Hash: ${hash}`)
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
