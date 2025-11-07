export async function commandExplore(state, ...args) {
    if (args.length < 1) {
        console.log("You need to provide an area name to explore!");
        return;
    }
    try {
        const root = await state.pokeapi.exploreLocation(args[0]);
        if (root !== undefined) {
            for (const pokemon_encounter of root.pokemon_encounters) {
                console.log(pokemon_encounter.pokemon.name);
            }
        }
    }
    catch (err) {
        console.log(`Error: Failed call to pokeapi.exploreLocation() method --> ${err}`);
    }
}
