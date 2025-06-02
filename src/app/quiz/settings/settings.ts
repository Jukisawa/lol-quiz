import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService, Player } from '../score';


@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  constructor(private scoreService: ScoreService) {}
  showPopup = false;
  showTeamSettings = false;
  showGameSettings = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  displayTeamSettings() {
    this.showTeamSettings = true;    
    this.showGameSettings = false;
  }

  displayGameSettings() {
    this.showGameSettings = true;
    this.showTeamSettings = false; 
  }

  applySettings() {
    // Logic to apply settings goes here
    console.log('Settings applied');
    this.closePopup();
  }

  addPlayer() {
    this.scoreService.addPlayer('New Player');
  }
  removePlayer(player: Player) {
    if (player.id !== undefined) {
      this.scoreService.removePlayer(player.id);
    } else {
      console.error('Player id is undefined, cannot remove player.');
    }
  }
}
