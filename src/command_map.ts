import { PokeAPI } from "./pokeapi";
import { State } from "./state";

export async function commandMap(state: State): Promise<void> {
    // const locationList = [];

    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.nextLocationsURL);

        // PokeAPI.lastLocationId += PokeAPI.locationIncrementer;
        console.log("")
        console.log("Before Updating Info:")
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`)
        console.log("")

        state.prevLocationsURL = state.nextLocationsURL;
        const lastLocationId = Number(state.nextLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&")[0]) + state.locationIncrementer;
        state.nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${lastLocationId + state.locationIncrementer}&limit=${state.locationIncrementer}`;

        console.log("")
        console.log("After Updating Info:")
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`)
        console.log(`lastLocationId: ${lastLocationId}`)
        console.log("")
        // console.log(`nextLocationsURL: ${state.nextLocationsURL}`)

        if (shallowLocations !== undefined) {
            for (const locationEntry of shallowLocations.results) {
                // locationList.push(locationEntry.name);
                console.log(locationEntry.name);
            }
        }
    } catch (err) {
        console.log(`Error: Failed call to pokeapi.fetchLocations() method --> ${err}`);
    }
    
    // return locationList;
}