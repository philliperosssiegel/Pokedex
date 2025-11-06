export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    //   private static lastLocationId = -1;
    //   private static readonly locationIncrementer = 20;
    //   public static nextLocationsURL = `https://pokeapi.co/api/v2/location-area/?offset=0&limit=20`;
    //   public static prevLocationsURL = "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20";
    constructor() { }
    async fetchLocations(pageURL) {
        const response = await fetch(pageURL);
        // const responseLocationResults = response.json() as ShallowLocations;
        // PokeAPI.lastLocationId += PokeAPI.locationIncrementer;
        // PokeAPI.nextLocationsURL = `${PokeAPI.baseURL}/location-area/?offset=${PokeAPI.lastLocationId + 1}&limit=20`;
        return response.json();
        // } catch (err) {
        //     console.log(`Error running fetchLocations() function: ${err}`)
        // }
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
    async fetchLocation(locationName) {
        const fullURL = `${PokeAPI.baseURL}/location-area/`;
        const response = await fetch(fullURL);
        return response.json();
    }
}
// export type ShallowLocations = {
//   // add properties here
// };
// export type Location = {
//   // add properties here
// };
