import { createInterface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./commandCatch.js";
import { commandInspect } from "./commandInspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI } from "./pokeapi.js";
import { PokeCache } from "./pokecache.js";
function createReadLineInterface() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    return rl;
}
export function getCommands(locationIncrementer) {
    return {
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Explains how to use the Pokedex",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: `Print the next ${locationIncrementer} locations`,
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Print the previous ${locationIncrementer} locations",
            callback: commandMapB,
        },
        explore: {
            name: "explore",
            description: "Explore a location for Pokemon!",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a Pokemon!",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspect a Pokemon!",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "List every Pokemon that's been caught!",
            callback: commandPokedex
        }
    };
}
export function initState() {
    const locationIncrementer = 20;
    const newState = {
        nextLocationsURL: `https://pokeapi.co/api/v2/location-area/?offset=0&limit=${locationIncrementer}`,
        prevLocationsURL: `https://pokeapi.co/api/v2/location-area/?offset=0&limit=${locationIncrementer}`,
        locationIncrementer: locationIncrementer,
        mappingStepCount: 0,
        caughtPokemon: {},
        readline: createReadLineInterface(),
        commands: getCommands(locationIncrementer),
        pokeapi: new PokeAPI(new PokeCache(100000))
        // pokecache: new Cache(0)
    };
    return newState;
}
