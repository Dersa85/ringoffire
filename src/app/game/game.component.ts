import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentCard: string = '';
  pickCardAnimation = false;
  game: Game = new Game();

  constructor() { }

  ngOnInit() {}

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.pickCardAnimation) {
      return;
    }

    this.pickCardAnimation = true;
    this.currentCard = this.game.stack.pop()!;
    
    
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1);
    }, 1100);
  }
}
