import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sendreview } from '../../shared/models/sendreview';
import { RatingModule } from 'ngx-rating';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterViewInit {
  model: Sendreview = {'rate': 0, 'text': ''};
  submitted: boolean = false;
  selectedId: number;

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
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }

  // ViewChild - используем для получения доступа к указанному компоненту и его методам
  @ViewChild('userForm') userForm: NgForm;

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.selectedId = +params['id']; // чтение опционального параметра
    });
  }

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

  // onSubmit() {
  //   this.submitted = true;
  //   this.productService.sendReview(this.selectedId, this.model)
  //     .subscribe(data => console.log(data));
  // }
  /**
   * FAKE onSubmit for post review
   */
  onSubmit() {
    this.submitted = true;
    this.productService.sendReview(this.selectedId, this.model);
    this.model.rate = 0;
    this.model.text = '';
  }

  /**
   * Clear all messages after 5 seconds
   */
  clearMessages() {
    setTimeout(() => {
      this.formErrors.text = '';
    }, 3000);
  }
}
