const Field = require('./field.js');
const ReadLineSync = require('readline-sync');


module.exports = new class ReadLine {
    read() {
        const difficulty = [];
        difficulty[0] = ReadLineSync.question('Select difficulty (1-20): ');
        difficulty[1] = ReadLineSync.question('First move (I J): ');

        if (difficulty[0] > 0 && difficulty[0] < 21) {
            return new Field(difficulty);
        } else {
            console.log('Choose correct difficulty!');
        }
    }

    readMove() {
        return ReadLineSync.question('Move (I J): ');
    }
}
