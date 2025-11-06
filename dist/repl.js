import { initState, getCommands } from './state.js';
export function cleanInput(input) {
    const split_input = input.split(' ');
    const clean_ls = [];
    for (const word of split_input) {
        if (word != "") {
            clean_ls.push(word.toLowerCase());
        }
    }
    return clean_ls;
}
export function startREPL() {
    const state = initState();
    state.readline.prompt();
    state.readline.on('line', (line) => {
        if (line.length === 0 || !line) {
            state.readline.prompt();
        }
        else {
            try {
                const inputs = cleanInput(line);
                const commands = getCommands();
                const command = inputs[0];
                if (command in commands) {
                    commands[command].callback(commands);
                }
                else {
                    console.log("Unknown command");
                }
            }
            catch (err) {
                console.error(err);
            }
            state.readline.prompt();
        }
    });
}
