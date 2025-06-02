import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionField } from './question-field/question-field';
import { Question } from './question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule, QuestionField],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz implements OnInit {
  categories: string[] = [];
  questions: Question[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Question[]>('http://localhost:3000/api/question/find')
      .subscribe(data => this.questions = data);
    this.http.get<{name: string}[]>('http://localhost:3000/api/category/find')
      .subscribe(data => this.categories = data.map((c => c.name)));
  }

  getQuestionsForCategory(category: string) {
    return this.questions.filter(q => q.category === category);
  }
}
