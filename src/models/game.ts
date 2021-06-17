export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string = '';
    public pickCardAnimation = false;
    public profilePath: string[] = [];
    public gameOver :boolean = false;
    public drawTimeStemp : number = 0;

    constructor() {
        this.addCardsToStack();
        //this.addDebugStack();
        this.shuffle(this.stack);

        console.log(this);
    }

    addDebugStack() {
        for (let i = 1; i < 2; i++) {
            this.stack.push('ace_' + i);
        }
        for (let i = 1; i < 2; i++) {
            this.stack.push('clubs_' + i);
        }
        for (let i = 1; i < 2; i++) {
            this.stack.push('diamonds_' + i);
        }
        for (let i = 1; i < 2; i++) {
            this.stack.push('hearts_' + i);
        }
    }

    addCardsToStack() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('diamonds_' + i);
        }
        for (let i = 1; i < 14; i++) {
            this.stack.push('hearts_' + i);
        }
    }

    private shuffle(array: any[]) {
        array.sort(() => Math.random() - 0.5);
    }

    toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation,
            profilePath: this.profilePath,
            gameOver: this.gameOver,
            drawTimeStemp: this.drawTimeStemp
        }
    }
}