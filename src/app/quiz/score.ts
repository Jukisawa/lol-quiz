import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  id?: string;
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor() {}

  addPlayer(name: string) {
    const current = this.playersSubject.getValue();
    if (!current.some(player => player.name === name)) {
      const newPlayer: Player = { name, score: 0 };
      this.playersSubject.next([...current, newPlayer]);
    }
  }

  removePlayer(id: string) {
    const current = this.playersSubject.getValue();
    const updated = current.filter(player => player.id !== id);
    this.playersSubject.next(updated);
  }

  setPlayers(players: Player[]) {
    this.playersSubject.next(players);
  }

  updateScore(name: string, delta: number) {
    const current = this.playersSubject.getValue();
    const updated = current.map(player =>
      player.name === name ? { ...player, score: player.score + delta } : player
    );
    this.playersSubject.next(updated);
  }

  getPlayers(): Player[] {
    return this.playersSubject.getValue();
  }

  resetScores() {
    const reset = this.playersSubject.getValue().map(p => ({ ...p, score: 0 }));
    this.playersSubject.next(reset);
  }
}
