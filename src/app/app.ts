import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Quiz } from './quiz/quiz'; // Adjust the path if needed

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Quiz],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'quiz';
}