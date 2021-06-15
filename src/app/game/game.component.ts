import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentCard: string = '';
  pickCardAnimation = false;
  game: Game = new Game();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.pickCardAnimation || !this.game.players.length) {
      return;
    }

    this.pickCardAnimation = true;
    this.currentCard = this.game.stack.pop()!;
    
    this.changeToNextPlayer();

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 10);
    }, 1100);
  }

  changeToNextPlayer() {
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name) {
        this.game.players.push(name);
      }
    })
  }
}
