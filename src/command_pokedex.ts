import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {

    const caughtPokemon = Object.values(state.caughtPokemon);

    console.log(`Your Pokedex (${caughtPokemon.length} total Pokemon):`)
    for (const pokemon of caughtPokemon) {
        console.log(`\t- ${pokemon.name}`);
    }
}