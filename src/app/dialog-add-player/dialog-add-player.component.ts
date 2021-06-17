import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  playerInfo: any = {
    name: '',
    picturePath: 'assets/img/profile/male.png'
  }

  allPictures: string[] = [
    'assets/img/profile/male.png',
    'assets/img/profile/female.png',
    'assets/img/profile/bunny.png',
    'assets/img/profile/elephant.png',
    'assets/img/profile/giraffe.png',
    'assets/img/profile/kitten-2.png'
  ]

  constructor(
    private dialogRef: MatDialogRef<DialogAddPlayerComponent>
  ) { }

  ngOnInit() {
  }

  selectProfile(path: string) : void {
    this.playerInfo.picturePath = path
    console.log(this.playerInfo);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
