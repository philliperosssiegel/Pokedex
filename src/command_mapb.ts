import { PokeAPI } from "./pokeapi";
import { State } from "./state";

export async function commandMapB(state: State): Promise<void> {
    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

        console.log("")
        console.log("Before Updating Info:")
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`)
        console.log("")

        state.nextLocationsURL = state.prevLocationsURL;

        const lastLocationId = Number(state.nextLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&")[0]);
        const prevLocationId = lastLocationId >= state.locationIncrementer ? lastLocationId - state.locationIncrementer : 0 
        state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${prevLocationId}&limit=${state.locationIncrementer}`;

        console.log("")
        console.log("After Updating Info:")
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`)
        console.log(`lastLocationId: ${lastLocationId}`)
        console.log(`prevLocationId: ${prevLocationId}`)
        console.log("")

        // console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        // console.log(`prevLocationId: ${prevLocationId}`)
        // console.log(`nextLocationsURL: ${state.nextLocationsURL}`)

        if (shallowLocations !== undefined) {
            for (const locationEntry of shallowLocations.results) {
                console.log(locationEntry.name);
            }
        }
    } catch (err) {
        console.log(`Error: Failed call to pokeapi.fetchLocations() method --> ${err}`);
    }
}