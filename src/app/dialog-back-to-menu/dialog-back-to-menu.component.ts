import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-back-to-menu',
  templateUrl: './dialog-back-to-menu.component.html',
  styleUrls: ['./dialog-back-to-menu.component.scss']
})
export class DialogBackToMenuComponent implements OnInit {

  endingGame: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<DialogBackToMenuComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
