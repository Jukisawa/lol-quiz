import { Component, OnInit } from '@angular/core';
import { ScoreService, Player } from '../score';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css'
})
export class Scoreboard {
  players: Player[] = [];

  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.scoreService.players$.subscribe(players => {
      this.players = players;
    });
  }
}
