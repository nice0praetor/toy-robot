import readline from 'readline';
import { parseCommand } from './lib/command';
import { GameState } from './lib/state';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});



const game = new GameState();
console.log("Game ready. Ctrl-c to exit.\n\nPlease type your command\n")
rl.on('line', function(line){
    const command = parseCommand(line);
    if (command) {
        game.perform(command);
    }
})
