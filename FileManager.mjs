import Hash from "./Modules/Hash.mjs";
import Os from "./Modules/Os.mjs";
import ArgumentParser from "./Helpers/ArgumentParser.mjs";
import Exit from "./Modules/Exit.mjs";
import CommandParser from "./Helpers/CommandParser.mjs";
import Compress from "./Modules/Compress.mjs";

export default class FileManager {
    userName = ''
    readlineInterface = undefined
    modules = [
        new Exit(this),
        new Hash(this),
        new Os(this),
        new Compress(this),
    ];

    constructor(args, readlineInterface) {
        this.userName = this.parseUsernameFromArguments(args);
        this.readlineInterface = readlineInterface;

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


