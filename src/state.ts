import { createInterface, type Interface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { CLICommand } from './command.js';
import { PokeAPI } from "./pokeapi.js";
import { PokeCache } from "./pokecache.js"

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    locationIncrementer: number;
    mappingStepCount: number;
    // pokecache: Cache
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
        callback: commandExit
        },
        help: {
        name: "help",
        description: "Explains how to use the pokedex",
        callback: commandHelp,
        },
        map: {
        name: "map",
        description: `Print the next X locations`,
        callback: commandMap,
        },
        mapb: {
        name: "mapb",
        description: "Print the previous X locations",
        callback: commandMapB,
        },
    };
}

export function initState(): State {
    const newState: State = {
        readline: createReadLineInterface(),
        commands: getCommands(),
        pokeapi: new PokeAPI(new PokeCache(100000)),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
        prevLocationsURL: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
        locationIncrementer: 20,
        mappingStepCount: 0,
        // pokecache: new Cache(0)
    };

    return newState;
}