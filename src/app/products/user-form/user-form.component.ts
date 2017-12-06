import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sendreview } from '../../shared/models/sendreview';
import { RatingModule } from 'ngx-rating';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.css']
})
export class UserFormComponent implements AfterViewInit {

  xrate: number[] = [0, 1, 2, 3, 4, 5];
  model: Sendreview = {'rate': 0, 'text': ''};
  submitted: boolean = false;
  test: any;

  // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
  formErrors = {
    'text': ''
  };

  // Объект с сообщениями ошибок
  validationMessages = {
    'text': {
      'required': 'Обязательное поле.',
    }
  };


  // ViewChild - используем для получения доступа к указанному компоненту и его методам
  @ViewChild('userForm') userForm: NgForm;

  ngAfterViewInit() {
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.userForm) return;
    let form = this.userForm.form;

    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      // form.get - получение элемента управления
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += message[key] + ' ';
        }
        this.clearMessages();
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

  onClickStar(){
    console.log(this.test);
  }

  /**
   * Clear all messages after 5 seconds
   */
  clearMessages() {
    setTimeout(() => {
      this.formErrors.text = '';
    }, 5000);
  }
}
