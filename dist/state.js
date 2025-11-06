import { createInterface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
function createReadLineInterface() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    return rl;
}
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Explains how to use the pokedex",
            callback: commandHelp,
        },
    };
}
export function initState() {
    const newState = {
        readline: createReadLineInterface(),
        commands: getCommands()
    };
    return newState;
}
