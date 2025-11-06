// import { exit }  from 'node:process';

// command_exit.ts
import { State } from "./state";

export async function commandExit(state: State): Promise<void> {
    state.readline.on("close", () => {
        console.log("Closing the Pokedex... Goodbye!");
        process.exit(0); 
        }
    )
    state.readline.close();
}

// export function commandExit() {
//     console.log("Closing the Pokedex... Goodbye!");
//     exit(0);
// }