export async function commandMap(state) {
    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        state.mappingStepCount++;
        state.nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${state.mappingStepCount * state.locationIncrementer}&limit=${state.locationIncrementer}`;
        state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${Math.max(state.mappingStepCount - 2, 0) * state.locationIncrementer}&limit=${state.locationIncrementer}`;
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
