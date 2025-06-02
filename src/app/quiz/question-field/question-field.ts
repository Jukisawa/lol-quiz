import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../question.model';

@Component({
  selector: 'app-question-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-field.html',
  styleUrl: './question-field.css'
})
export class QuestionField {
  @Input() question!: Question;

  showPopup = false;
  showAnswer = false;
  shownHints = 0;

  openPopup() {
    this.showPopup = true;
    this.showAnswer = false;
    this.shownHints = 0;
  }

  closePopup() {
    this.showPopup = false;
  }

  displayHint() {
    if (this.shownHints < this.question.hints.length) {
      this.shownHints++;
    }
  }

  displayAnswer() {
    this.showAnswer = true;
  }
}
