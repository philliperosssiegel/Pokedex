export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    pokecache;
    constructor(pokecache) {
        this.pokecache = pokecache;
    }
    async inspectPokemon(pokemon_name) {
        const pageURL = `${PokeAPI.baseURL}/pokemon/${pokemon_name}`;
        const cached = this.pokecache.get(pageURL);
        // console.log(`Running inspectPokemon: pageURL = ${pageURL}`);
        if (cached) {
            // console.log("Returning cached result!");
            return cached;
        }
        else {
            const response = await fetch(pageURL);
            const returnedJSON = response.json();
            this.pokecache.add(pageURL, returnedJSON);
            return returnedJSON;
        }
    }
    async exploreLocation(area_name) {
        const pageURL = `${PokeAPI.baseURL}/location-area/${area_name}`;
        const cached = this.pokecache.get(pageURL);
        // console.log(`Running exploreLocation: pageURL = ${pageURL}`);
        if (cached) {
            // console.log("Returning cached result!");
            return cached;
        }
        else {
            const response = await fetch(pageURL);
            const returnedJSON = response.json();
            this.pokecache.add(pageURL, returnedJSON);
            return returnedJSON;
        }
    }
    async fetchLocations(pageURL) {
        const cached = this.pokecache.get(pageURL);
        // console.log(`Running fetchLocations: pageURL = ${pageURL}`);
        if (cached) {
            // console.log("Returning cached result!")
            return cached;
        }
        else {
            const response = await fetch(pageURL);
            const returnedJSON = response.json();
            this.pokecache.add(pageURL, returnedJSON);
            return returnedJSON;
        }
    }
    async fetchLocation(locationName) {
        const fullURL = `${PokeAPI.baseURL}/location-area/`;
        const cached = this.pokecache.get(fullURL);
        if (cached) {
            return cached;
        }
        else {
            const response = await fetch(fullURL);
            this.pokecache.add(fullURL, response.json());
            return response.json();
        }
    }
}
