import { fileURLToPathBuffer } from "url"
import { PokeCache } from "./pokecache"

export type ShallowLocations = {
    "count": number,
    "next": string,
    "previous": string,
    "results": Location[]
}

export type Location = {
    "name": string,
    "url" : string
}

export interface Root {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: Location
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
}

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

  async exploreLocation(area_name: string): Promise<Root> {
    const pageURL = `${PokeAPI.baseURL}/location-area/${area_name}`;

    const cached = this.pokecache.get<Root>(pageURL);
    console.log(`Running exploreLocation: pageURL = ${pageURL}`);

    if (cached) {
        console.log("Returning cached result!");
        return cached;
    } else {
        const response = await fetch(pageURL);
        const returnedJSON = response.json();
        this.pokecache.add<Promise<Root>>(pageURL, returnedJSON);

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