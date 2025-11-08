import { initState, getCommands } from './state.js';

export function cleanInput(input: string): string[] {
  const split_input = input.split(' ');
  const clean_ls = [];
  for (const word of split_input) {
    if (word != ""){
        clean_ls.push(word.toLowerCase());
    }
  }
  return clean_ls;
}

export function startREPL() {
    const state = initState();
    state.readline.prompt();
    state.readline.on('line', async (line: string) => {
    if (line.length === 0 || !line) {
        state.readline.prompt()
    } else {
        try {
            let inputs = cleanInput(line);
            const commands = getCommands();
            const command = inputs[0];
            if (inputs.length > 1) {
                inputs = inputs.slice(1);
            }

            if (command in commands) {
                await commands[command].callback(state, inputs[0]);
            } else {
                console.log("Unknown command");
            }
        } catch (err) {
            console.error(err);
        }
        state.readline.prompt()
    }
    });
}
