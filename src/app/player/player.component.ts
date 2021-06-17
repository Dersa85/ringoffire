import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {



  @Input() profilePath: string = 'assets/img/profile/male.png';
  @Input() name: string= '';
  @Input() playerActive:boolean = false;
  
  @Output() playerQuit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.playerQuit.emit();
  }

}
