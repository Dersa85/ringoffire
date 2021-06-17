import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogBackToMenuComponent } from '../dialog-back-to-menu/dialog-back-to-menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game!: Game;
  SOUND_DRAW: HTMLAudioElement = new Audio('assets/sound/draw-card.mp3');
  SOUND_OPEN_DIALOG: HTMLAudioElement = new Audio('assets/sound/open-dialog.mp3');

  gameId: string = '';


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activaRoute: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.SOUND_DRAW.volume = 0.2;
    this.SOUND_OPEN_DIALOG.volume = 0.2;
    this.newGame();
    this.activaRoute.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;

      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation,
          this.game.currentCard = game.currentCard;
          this.game.profilePath = game.profilePath;
          this.game.gameOver = game.gameOver;
          this.game.drawTimeStemp = game.drawTimeStemp;

          console.log(Date.now() - this.game.drawTimeStemp);
          
          if (Date.now() - this.game.drawTimeStemp < 1000) {
            this.SOUND_DRAW.play();
          }
        });
    })
  }

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
    if (this.game.pickCardAnimation || !this.game.players.length) {
      return;
    }

    this.game.drawTimeStemp = Date.now();
    this.game.pickCardAnimation = true;
    this.game.currentCard = this.game.stack.pop()!;
    this.changeToNextPlayer();
    
    this.saveGame();

    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        
        if (this.game.stack.length == 0) {
          this.game.gameOver = true;
        }
        this.saveGame();
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

    dialogRef.afterClosed().subscribe((endingGame: boolean) => {
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

    dialogRef.afterClosed().subscribe((information: any) => {
      if (information.name) {
        this.game.players.push(information.name);
        this.game.profilePath.push(information.picturePath);
        this.saveGame();
      }
    })
  }

  deletePlayer(index:number) {
    this.game.players.splice(index, 1);
    this.game.profilePath.splice(index, 1);

    if (this.game.players.length == 0 || this.game.currentPlayer >= this.game.players.length) {
      this.game.currentPlayer = 0;
    }
    this.saveGame();
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }
}
