export async function commandMap(state) {
    // const locationList = [];
    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        // PokeAPI.lastLocationId += PokeAPI.locationIncrementer;
        state.prevLocationsURL = state.nextLocationsURL;
        const lastLocationId = Number(state.nextLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&"));
        state.nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${lastLocationId + 1}&limit=${state.locationIncrementer}`;
        if (shallowLocations !== undefined) {
            for (const locationEntry of shallowLocations.results) {
                // locationList.push(locationEntry.name);
                console.log(locationEntry.name);
            }
        }
    }
    catch (err) {
        console.log(`Error: Failed call to pokeapi.fetchLocations() method --> ${err}`);
    }
    // return locationList;
}
export async function commandMapB(state) {
    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = state.prevLocationsURL;
        const lastLocationId = Number(state.prevLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&"));
        state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${lastLocationId + 1}&limit=${state.locationIncrementer}`;
        if (shallowLocations !== undefined) {
            for (const locationEntry of shallowLocations.results) {
                console.log(locationEntry.name);
            }
        }
    }
    catch (err) {
        console.log(`Error: Failed call to pokeapi.fetchLocations() method --> ${err}`);
    }
}
