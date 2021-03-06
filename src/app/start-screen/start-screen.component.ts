import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit() {}

  newGame() {
    // Start game
    let game = new Game()
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then( (databaseInfo: any) => {
        this.router.navigateByUrl('/game/' + databaseInfo.id);
      })
  }
  
}
