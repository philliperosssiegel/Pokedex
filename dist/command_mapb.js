export async function commandMapB(state) {
    try {
        const shallowLocations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        console.log("");
        console.log("Before Updating Info:");
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`);
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`);
        console.log("");
        state.mappingStepCount--;
        state.nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${state.mappingStepCount * state.locationIncrementer}&limit=${state.locationIncrementer}`;
        state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${Math.max(state.mappingStepCount - 2, 0) * state.locationIncrementer}&limit=${state.locationIncrementer}`;
        // const lastLocationId = Number(state.nextLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&")[0]);
        // state.nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${Math.max(lastLocationId - state.locationIncrementer)}&limit=${state.locationIncrementer}`;
        // state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${Math.max(lastLocationId - (3 * state.locationIncrementer), 0)}&limit=${state.locationIncrementer}`;
        // state.nextLocationsURL = state.prevLocationsURL;
        // const lastLocationId = Number(state.nextLocationsURL.replace("https://pokeapi.co/api/v2/location-area/?offset=", "").split("&")[0]);
        // const prevLocationId = lastLocationId >= state.locationIncrementer ? lastLocationId - state.locationIncrementer : 0 
        // state.prevLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=${prevLocationId}&limit=${state.locationIncrementer}`;
        console.log("");
        console.log("After Updating Info:");
        console.log(`prevLocationsURL: ${state.prevLocationsURL}`);
        console.log(`nextLocationsURL: ${state.nextLocationsURL}`);
        console.log(`mappingStepCount: ${state.mappingStepCount}`);
        // console.log(`lastLocationId: ${lastLocationId}`)
        // console.log(`prevLocationId: ${prevLocationId}`)
        console.log("");
        // console.log(`prevLocationsURL: ${state.prevLocationsURL}`)
        // console.log(`prevLocationId: ${prevLocationId}`)
        // console.log(`nextLocationsURL: ${state.nextLocationsURL}`)
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
