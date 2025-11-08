import { State } from "./state";

function successChance(
    baseExperience: number,
    midpoint = 100,
    steepness = 0.0147,
    min = 0.01,
    max = 0.99
): number {
    const chance = 1 / (1 + Math.exp(steepness * (baseExperience - midpoint)));
    
    return Math.min(max, Math.max(min, chance));
};

export async function commandCatch(state: State, ...args: string[]): Promise<void> {

    if (args.length < 1) {
        console.log("You need to choose a pokemon to try and catch!");
        return;
    }

    try {
        const pokemonName = args[0]
        const PokemonRoot = await state.pokeapi.inspectPokemon(pokemonName);

        console.log(`Throwing a Pokeball at ${pokemonName}...`)

        if (PokemonRoot !== undefined) {
            if (Math.random() < successChance(PokemonRoot.base_experience)) {
                state.caughtPokemon[PokemonRoot.name] = PokemonRoot;
                console.log(`${pokemonName} was caught!`);
            } else {
                console.log(`${pokemonName} escaped!`)
            }
        }
    } catch (err) {
        console.log(`Error: Failed call to pokeapi.exploreLocation() method --> ${err}`);
    }
}