// import { exit }  from 'node:process';
export async function commandExit(state) {
    state.readline.on("close", () => {
        console.log("Closing the Pokedex... Goodbye!");
        process.exit(0);
    });
    state.readline.close();
}
// export function commandExit() {
//     console.log("Closing the Pokedex... Goodbye!");
//     exit(0);
// }
