export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        this.addCardsToStack();
        this.shuffle(this.stack);
        
        console.log(this);
    }

    addCardsToStack() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_'+ i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_'+ i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('diamonds_'+ i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('hearts_'+ i);
        }
    }

    shuffle(array: any[]) {
        array.sort(() => Math.random() - 0.5);
    }
}