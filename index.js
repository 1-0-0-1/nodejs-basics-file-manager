import FileManager from './FileManager.mjs'
import readline from 'readline';

const readlineInterface = readline.createInterface(process.stdin, process.stdout)

new FileManager(process.argv, readlineInterface).run();
