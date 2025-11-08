import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {

    if (args.length < 1) {
        console.log("You need to provide an area name to explore!");
        return;
    }

    try {
        const locationName = args[0]
        const LocationRoot = await state.pokeapi.exploreLocation(locationName);

        if (LocationRoot !== undefined) {
            for (const pokemon_encounter of LocationRoot.pokemon_encounters) {
                console.log(pokemon_encounter.pokemon.name);
            }
        }
    } catch (err) {
        console.log(`Error: Failed call to pokeapi.exploreLocation() method --> ${err}`);
    }
}