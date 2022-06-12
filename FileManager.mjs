import Hash from "./Modules/Hash.mjs";
import Os from "./Modules/Os.mjs";
import ArgumentParser from "./Helpers/ArgumentParser.mjs";
import Exit from "./Modules/Exit.mjs";
import CommandParser from "./Helpers/CommandParser.mjs";
import Compress from "./Modules/Compress/Compress.mjs";
import Up from "./Modules/Navigation/Up.mjs";
import Cd from "./Modules/Navigation/Cd.mjs";
import Ls from "./Modules/Navigation/Ls.mjs";
import Uncompress from "./Modules/Compress/Uncompress.mjs";
import Add from "./Modules/Files/Add.mjs";

export default class FileManager {
    userName = ''
    readlineInterface = null
    modules = [
        new Exit(this),
        new Hash(this),
        new Os(this),
        new Compress(this),
        new Uncompress(this),
        new Up(this),
        new Cd(this),
        new Ls(this),
        new Add(this),
    ];

    constructor(args, readlineInterface, workDir) {
        this.userName = this.parseUsernameFromArguments(args);
        this.readlineInterface = readlineInterface;
        process.chdir(workDir);
    }

    parseUsernameFromArguments(args) {
        const parsedArguments = ArgumentParser.parse(args);
        if (parsedArguments.hasOwnProperty('username')) {
            return parsedArguments.username;
        }
        throw new Error('Operation failed');
    }

    greetingsMessage() {
        console.log(`Welcome to the File Manager, ${this.userName}!`)
    }

    exit() {
        this.readlineInterface.close();
        console.log(`\nThank you for using File Manager, ${this.userName}!`)
        process.exit(0);
    }

    run() {
        this.readlineInterface.on('SIGINT', () => {
            this.exit();
        });
        this.greetingsMessage()
        this.readlineLoop();
    }

    readlineLoop() {
        console.log(`You are currently in ${process.cwd()}`);
        this.readlineInterface.question('Command: ', (userInput) => {
            const command = CommandParser.parse(userInput);
            try {
                let statusCode = false;
                for (let singleModule of this.modules) {
                    if (singleModule.isSupport(command)) {
                        if (!singleModule.isValidCommand(command)) {
                            break;
                        }
                        statusCode = singleModule.handle(command);
                    }
                }
                if (!statusCode) {
                    console.log('Invalid input');
                }
            } catch (error) {
                console.log(error.message);
            }
            this.readlineLoop();
        });
    };

}


