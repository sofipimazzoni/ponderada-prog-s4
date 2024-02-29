import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormQuestionComponent } from '../dynamic_form_question/dynamic_form_question.component';

import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic_form.component.html',
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
