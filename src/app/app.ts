import { Component } from '@angular/core';
import { Quiz } from './quiz/quiz'; // Adjust the path if needed

@Component({
  selector: 'app-root',
  imports: [Quiz],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'quiz';
}