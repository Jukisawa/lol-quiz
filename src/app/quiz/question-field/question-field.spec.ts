import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionField } from './question-field';

describe('QuestionField', () => {
  let component: QuestionField;
  let fixture: ComponentFixture<QuestionField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
