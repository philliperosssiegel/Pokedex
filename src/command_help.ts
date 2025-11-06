// import { CLICommand } from "./command";

// command_exit.ts
import { State } from "./state";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:")
    console.log("");

    for (const command of Object.values(state.commands)) {
        console.log(`${command['name']}: ${command['description']}`)
    }
}

// export function commandHelp(commands: Record<string, CLICommand> ){
//     console.log("Welcome to the Pokedex!");
//     console.log("Usage:")
//     console.log("");

//     for (const command of Object.values(commands)) {
//         console.log(`${command['name']}: ${command['description']}`)
//     }
// }