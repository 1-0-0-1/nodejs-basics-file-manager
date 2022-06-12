import FileManager from './FileManager.mjs'
import readline from 'readline';
import os from "os";

const readlineInterface = readline.createInterface(process.stdin, process.stdout)

new FileManager(process.argv, readlineInterface, os.homedir()).run();
