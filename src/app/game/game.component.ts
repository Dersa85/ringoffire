import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogBackToMenuComponent } from '../dialog-back-to-menu/dialog-back-to-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentCard: string = '';
  pickCardAnimation = false;
  game: Game = new Game();
  SOUND_DRAW: HTMLAudioElement = new Audio('assets/sound/draw-card.mp3');
  SOUND_OPEN_DIALOG: HTMLAudioElement = new Audio('assets/sound/open-dialog.mp3');


  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Set the rules to begin
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * Draw the next card and switch to the next player
   */
  takeCard(): void {
    if (this.pickCardAnimation || !this.game.players.length) {
      return;
    }

    this.SOUND_DRAW.play();
    this.pickCardAnimation = true;
    this.currentCard = this.game.stack.pop()!;
    
    this.changeToNextPlayer();

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 10);
    }, 700);
  }

  /**
   * Change player 0 => 1 => 2 => 3 ..... n => 0
   */
  changeToNextPlayer() {
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length
  }

  /**
   * Open dialog for cancel game
   */
  cancelGame() {
    const dialogRef = this.dialog.open(DialogBackToMenuComponent);
    this.SOUND_OPEN_DIALOG.play();

    dialogRef.afterClosed().subscribe((endingGame:boolean) => {
      if (endingGame) {
        this.router.navigateByUrl('/');
      }
    })
  }

  /**
   * Open the dialog for add new player
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    this.SOUND_OPEN_DIALOG.play();

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name) {
        this.game.players.push(name);
      }
    })
  }
}
