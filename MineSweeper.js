const ReadLine = require('./classes/readline.js');
const Field = require('./classes/field.js');

console.clear();

const fieldControl = ReadLine.read();

while (true) {
    const move = ReadLine.readMove().split(' ');
    [move[0], move[1]] = [Number(move[0]), Number(move[1])];

    fieldControl.revealEmptyFields(move);
    fieldControl.ifNumberOrMine(move);

    fieldControl.print();
}
