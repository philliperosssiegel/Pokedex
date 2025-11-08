import { State } from "./state";

export async function commandExit(state: State): Promise<void> {
    state.readline.on("close", () => {
        console.log("Closing the Pokedex... Goodbye!");
        process.exit(0); 
        }
    )
    state.readline.close();
}