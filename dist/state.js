import { createInterface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";
import { PokeCache } from "./pokecache.js";
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
export function initState() {
    const newState = {
        readline: createReadLineInterface(),
        commands: getCommands(),
        pokeapi: new PokeAPI(new PokeCache(0)),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
        prevLocationsURL: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
        locationIncrementer: 20,
        mappingStepCount: 0,
        // pokecache: new Cache(0)
    };
    return newState;
}
