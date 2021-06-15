import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  name:string = '';
  ngOnInit() {
  }

  closeDialog() {
    //this.dialogRef.close('Pizza!');
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

}
