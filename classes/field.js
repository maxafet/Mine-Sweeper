module.exports = class Field {
    constructor(diff) {
        this.difficulty = diff[0];
        this.firstMove = diff[1].split(' ');
        this.build();
        this.print();
    }

    build() {
        this.createField(this.difficulty);
        this.fillByMines(this.difficulty);
        this.firstMove = this.toNumber(this.firstMove);
        this.makeFirstMove(this.firstMove);
    }

    print() {
        console.table(this.field);
        console.table(this.hiddenField);
    }

    getRndCor(max) {
        return [Math.floor(Math.random() * max),
                Math.floor(Math.random() * max)];
    }

    createField(diff) {
        diff = Number(diff);

        this.field = new Array(diff);                      // <---
        this.hiddenField = new Array(diff);                //
                                                           //
        for (let i = 0; i < this.field.length; i++) {      // Содание пустых полей
            this.field[i] = new Array(diff);               //
            this.hiddenField[i] = new Array(diff);         //
        }                                                  // <---

        for (let i = 0; i < this.field.length; i++) {      // <---
            for (let j = 0; j < this.field.length; j++) {  //
                this.field[i][j] = '□';                    //
                this.hiddenField[i][j] = '□';              // Заполнение полей
            }                                              //
        }                                                  // <---
    }

    fillByMines(diff) {
        let minesCounter = 0;                                // Счетчик мин

        while (minesCounter < diff) {                        // <---
            var rndCor = this.getRndCor(diff);               //
                                                             // Заполнение
            if (this.field[rndCor[0]][rndCor[1]] != '*' &&   //
                           rndCor[0] != this.firstMove[0] && //
                           rndCor[1] != this.firstMove[1]) { // основного
                this.field[rndCor[0]][rndCor[1]] = '*';      // поля минами
                minesCounter++;                              //
            }                                                //
        }                                                    // <---

        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                minesCounter = 0;

                if (this.field[i][j] == '*') {
                    continue;
                }
                try {
                    if (this.field[i-1][j-1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i-1][j] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i-1][j+1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i][j-1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i][j+1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i+1][j-1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i+1][j] == '*') {
                        minesCounter++;
                    }
                } catch {}
                try {
                    if (this.field[i+1][j+1] == '*') {
                        minesCounter++;
                    }
                } catch {}
                if (minesCounter > 0) {
                    this.field[i][j] = minesCounter;
                }
            }
        }
    }

    makeFirstMove(cors) {                               // Первый ход без мин
        if (this.field[cors[0]][cors[1]] == '□') {
            this.field[cors[0]][cors[1]] = 0;
            this.hiddenField[cors[0]][cors[1]] = 0;

            this.revealEmptyFields(cors);

        } else {
            this.hiddenField[cors[0]][cors[1]] = this.field[cors[0]][cors[1]];
        }
    }

    toNumber(cors) {                                    // Перевод вводимых координат в число
        return [Number(cors[0]), Number(cors[1])];
    }

    revealEmptyFields(cors) {                                     // Открытие смежных пустых клеток
        const collection = [[cors[0], cors[1]]];
        let length = collection.length - 1;

        while(length < collection.length * 2) {
            collection.forEach((item, i, collection) => {
                try {
                    if (this.field[item[0]-1][item[1]] == '□') {
                        this.field[item[0]-1][item[1]] = 0;
                        this.hiddenField[item[0]-1][item[1]] = 0;
                        collection.push([item[0]-1, item[1]]);
                    }
                } catch {}
                try {
                    if (this.field[item[0]][item[1]+1] == '□') {
                        this.field[item[0]][item[1]+1] = 0;
                        this.hiddenField[item[0]][item[1]+1] = 0;
                        collection.push([item[0], item[1]+1]);    // Открытие смежных пустых клеток
                    }                                             // BUG: Иногда появляются нули в несмежных места
                } catch {}
                try {
                    if (this.field[item[0]+1][item[1]] == '□') {
                        this.field[item[0]+1][item[1]] = 0;
                        this.hiddenField[item[0]+1][item[1]] = 0;
                        collection.push([item[0]+1, item[1]]);
                    }
                } catch {}
                try {
                    if (this.field[item[0]][item[0]-1] == '□') {
                        this.field[item[0]][item[0]-1] = 0;
                        this.hiddenField[item[0]][item[0]-1] = 0;
                        collection.push([item[0], item[0]-1]);
                    }
                } catch {}
            });

            length++;                                             // Открытие смежных пустых клеток
        }

        this.showBorderNumbers();
    }

    showBorderNumbers() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                if (this.field[i][j] == '*') {
                    continue;
                }
                if (this.field[i][j] == 0) {
                    try {
                        if (this.field[i-1][j-1] != '*' && this.field[i-1][j-1] != undefined) {
                            this.hiddenField[i-1][j-1] = this.field[i-1][j-1];
                        }
                    } catch {}
                    try {
                        if (this.field[i-1][j] != '*' && this.field[i-1][j] != undefined) {
                            this.hiddenField[i-1][j] = this.field[i-1][j];
                        }
                    } catch {}
                    try {
                        if (this.field[i-1][j+1] != '*' && this.field[i-1][j+1] != undefined) {
                            this.hiddenField[i-1][j+1] = this.field[i-1][j+1];
                        }
                    } catch {}
                    try {
                        if (this.field[i][j-1] != '*' && this.field[i][j-1] != undefined) {
                            this.hiddenField[i][j-1] = this.field[i][j-1];
                        }
                    } catch {}
                    try {
                        if (this.field[i][j+1] != '*' && this.field[i][j+1] != undefined) {
                            this.hiddenField[i][j+1] = this.field[i][j+1];
                        }
                    } catch {}
                    try {
                        if (this.field[i+1][j-1] != '*' && this.field[i+1][j-1] != undefined) {
                            this.hiddenField[i+1][j-1] = this.field[i+1][j-1];
                        }
                    } catch {}
                    try {
                        if (this.field[i+1][j] != '*' && this.field[i+1][j] != undefined) {
                            this.hiddenField[i+1][j] = this.field[i+1][j];
                        }
                    } catch {}
                    try {
                        if (this.field[i+1][j+1] != '*' && this.field[i+1][j+1] != undefined) {
                            this.hiddenField[i+1][j+1] = this.field[i+1][j+1];
                        }
                    } catch {}
                }
            }
        }
    }

    ifNumberOrMine(move) {
        if (this.field[move[0]][move[1]] == '*') {
            console.log('Game Over');

            process.exit(0);
        } else {
            this.hiddenField[move[0]][move[1]] = this.field[move[0]][move[1]];
        }
    }
}
