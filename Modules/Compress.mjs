import FilemanagerModule from "./FilemanagerModule.mjs";
import fs from "fs";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";
import zlib from "zlib";

export default class Compress extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'compress';
    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && command.getArguments()[1]
            && fs.existsSync(command.getArguments()[0]);
    }

    handle(command) {
        try {
            const srcFilename = command.getArguments()[0];
            const dstFilename = command.getArguments()[1];

            const brotli = zlib.createBrotliCompress();

            const srcFile = fs.createReadStream(srcFilename);
            const dstFile = fs.createWriteStream(dstFilename, {encoding: 'binary'});

            srcFile.pipe(brotli).pipe(dstFile);
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
