import { createInterface, type Interface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { CLICommand } from './command.js';

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

function createReadLineInterface() {
    const rl = createInterface(
        {
            input: process.stdin,
            output: process.stdout,
            prompt: "> "
        }
    );
    return rl;
}

export function getCommands(): Record<string, CLICommand> {
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

export function initState(): State {
    const newState: State = {
        readline: createReadLineInterface(),
        commands: getCommands()
    };

    return newState;
}