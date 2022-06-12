import FilemanagerModule from "./FilemanagerModule.mjs";
import os from "os";
import OperationFailedException from "../Exceptions/OperationFailedException.mjs";

export default class Os extends FilemanagerModule {
    constructor(filemanager) {
        super(filemanager);
    }

    isSupport(command) {
        return command.getName() === 'os';

    }

    isValidCommand(command) {
        return command.getArguments()[0]
            && ['--EOL', '--cpus', '--homedir', '--username', '--architecture'].includes(command.getArguments()[0])
    }

    handle(command) {
        try {
            switch (command.getArguments()[0]) {
                case '--EOL':
                    os.EOL === "\n" ? this.writeln(`EOL: \\n`) : this.writeln(`EOL: \\r\\n`);
                    break;
                case '--cpus':
                    const cpus = os.cpus();
                    this.writeln(`Cpus count: ${cpus.length}`);
                    for (let cpu of cpus) {
                        this.writeln(cpu.model);
                    }
                    break;
                case '--homedir':
                    this.writeln(`Homedir: ${os.homedir()}`);
                    break;
                case '--username':
                    this.writeln(`Username: ${os.userInfo().username}`);
                    break;
                case '--architecture':
                    this.writeln(`Architecture: ${os.arch()}`);
                    break;
            }
        } catch (error) {
            throw new OperationFailedException();
        }
        return true;
    }
}
