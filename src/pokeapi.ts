import { PokeCache } from "./pokecache"
import { LocationRoot, ShallowLocations } from "./pokeapi_types_location"
import { PokemonRoot } from "./pokeapi_types_pokemon"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  pokecache: PokeCache;

  constructor(pokecache: PokeCache) {
    this.pokecache = pokecache;
  }
  
  async inspectPokemon(pokemon_name: string): Promise<PokemonRoot> {
    const pageURL = `${PokeAPI.baseURL}/pokemon/${pokemon_name}`;

    const cached = this.pokecache.get<PokemonRoot>(pageURL);
    // console.log(`Running inspectPokemon: pageURL = ${pageURL}`);

    if (cached) {
        // console.log("Returning cached result!");
        return cached;
    } else {
        const response = await fetch(pageURL);
        const returnedJSON = response.json();
        this.pokecache.add<Promise<PokemonRoot>>(pageURL, returnedJSON);

        return returnedJSON;
    }
  }

  async exploreLocation(area_name: string): Promise<LocationRoot> {
    const pageURL = `${PokeAPI.baseURL}/location-area/${area_name}`;

    const cached = this.pokecache.get<LocationRoot>(pageURL);
    // console.log(`Running exploreLocation: pageURL = ${pageURL}`);

    if (cached) {
        // console.log("Returning cached result!");
        return cached;
    } else {
        const response = await fetch(pageURL);
        const returnedJSON = response.json();
        this.pokecache.add<Promise<LocationRoot>>(pageURL, returnedJSON);

        return returnedJSON;
    }
  }

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    
    const cached = this.pokecache.get<ShallowLocations>(pageURL);
    // console.log(`Running fetchLocations: pageURL = ${pageURL}`);

    if (cached) {
        // console.log("Returning cached result!")
        return cached;
    } else {
        const response = await fetch(pageURL);
        const returnedJSON = response.json();

        this.pokecache.add<Promise<ShallowLocations>>(pageURL, returnedJSON)
        
        return returnedJSON;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/`;
    const cached = this.pokecache.get<Location>(fullURL);  

    if (cached) {
        return cached
    } else {
        const response = await fetch(fullURL);
        this.pokecache.add<Promise<Location>>(fullURL, response.json())

        return response.json();
    }
  }
}