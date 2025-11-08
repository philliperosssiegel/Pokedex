import { fileURLToPathBuffer } from "url"
import { PokeCache } from "./pokecache"
import { LocationRoot, ShallowLocations } from "./pokeapi_types_location"
import { PokemonRoot } from "./pokeapi_types_pokemon"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  pokecache: PokeCache;
//   private static lastLocationId = -1;
//   private static readonly locationIncrementer = 20;
//   public static nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=0&limit=20`;
//   public static prevLocationsURL = "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20";

  constructor(pokecache: PokeCache) {
    this.pokecache = pokecache;
  }
  
  async inspectPokemon(pokemon_name: string): Promise<PokemonRoot> {
    const pageURL = `${PokeAPI.baseURL}/pokemon/${pokemon_name}`;

    const cached = this.pokecache.get<PokemonRoot>(pageURL);
    console.log(`Running inspectPokemon: pageURL = ${pageURL}`);

    if (cached) {
        console.log("Returning cached result!");
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
    console.log(`Running exploreLocation: pageURL = ${pageURL}`);

    if (cached) {
        console.log("Returning cached result!");
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

    console.log(`Running fetchLocations: pageURL = ${pageURL}`);

    if (cached) {
        console.log("Returning cached result!")
        return cached;
    } else {
        const response = await fetch(pageURL);
        const returnedJSON = response.json();
        // console.log(`fetchLocations(pageURL) => `)
        this.pokecache.add<Promise<ShallowLocations>>(pageURL, returnedJSON)
        // const responseLocationResults = response.json() as ShallowLocations;
        // PokeAPI.lastLocationId += PokeAPI.locationIncrementer;
        // PokeAPI.nextLocationsURL = `${PokeAPI.baseURL}/location-area/?offset=${PokeAPI.lastLocationId + 1}&limit=20`;

        return returnedJSON;
        // } catch (err) {
        //     console.log(`Error running fetchLocations() function: ${err}`)
        // }
    }
  }

//   async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
//     const fullURL = `${PokeAPI.baseURL}/location-area/?offset=${PokeAPI.lastLocationId + 1}&limit=20`;
//     const response = await fetch(fullURL);
//     const responseLocationResults as shallowLocation = response.json()
//     const locationList = [];
    
//     for (const location_entry of responseLocationResults.results) {
//         locationList.push(location_entry.name);
//     }
//     return locationList;
//   }

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

// export type ShallowLocations = {
//   // add properties here
// };

// export type Location = {
//   // add properties here
// };