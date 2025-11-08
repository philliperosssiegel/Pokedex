import { State } from "./state";

function inspectPokemon(state: State, pokemonName: string): void {
    const pokemon = state.caughtPokemon[pokemonName];
    const species = pokemon.species;
    const base_experience = pokemon 

    // console.log(`Information about ${pokemonName}:`);
    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`\t- ${stat.stat.name}: ${stat.base_stat} (Effort = ${stat.effort})`);
    }

    console.log("Abilities:");
    for (const ability of pokemon.abilities) {
        console.log(`\t- ${ability.ability.name} (Hidden = ${ability.is_hidden})`);
    }

    console.log("Past Abilities:");
    for (const pastAbility of pokemon.past_abilities) {
        console.log(`\t- ${pastAbility.generation.name}`); //Naming collision on the Ability3 type? Can't access the appropriate attributes?
    }

    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`\t- ${type.type.name}`);
    }

    console.log("Game Indices:")
    for (const game of pokemon.game_indices) {
        console.log(`\t- ${game.version.name}`);
    }
}

export async function commandInspect(state: State, ...args: string[]): Promise<void> {

    if (args.length < 1) {
        console.log("You need to choose a pokemon to inspect!");
        return;
    }
    const pokemonName = args[0]

    if (pokemonName in state.caughtPokemon) {
        inspectPokemon(state, pokemonName);
    } else {
        console.log("You haven't caught that Pokemon yet!");
    }
}