export async function commandExit(state) {
    state.readline.on("close", () => {
        console.log("Closing the Pokedex... Goodbye!");
        process.exit(0);
    });
    state.readline.close();
}
