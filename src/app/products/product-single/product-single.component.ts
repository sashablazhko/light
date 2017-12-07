import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { AuthService } from '../../shared/services/auth.service';
import { ReviewsListComponent } from '../reviews-list/reviews-list.component';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-product-single',
  templateUrl: 'product-single.component.html',
  styleUrls: ['product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  isLogin: boolean;
  product: Product;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService) {
    this.isLogin = authService.isLoggedIn();
  }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params['id']; // конвертируем значение параметра id в тип number
      this.productService
        .getProduct(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
        .subscribe(product => this.product = product);
    });
  }
}
