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
