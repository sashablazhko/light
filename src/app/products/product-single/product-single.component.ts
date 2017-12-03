import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-single',
  templateUrl: 'product-single.component.html'
})
export class ProductSingleComponent implements OnInit {

  product: Product;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProductService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params['id']; // конвертируем значение параметра id в тип number
      this.service
        .getProduct(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
        .subscribe(product => this.product = product);
    });
  }

  // /**
  //  * Delete a user
  //  */
  // deleteUser() {
  //   this.service.deleteUser(this.user.id)
  //     .subscribe(data => {
  //       console.log('user was deleted');
  //       // route back to the users page
  //       this.router.navigate(['/users']);
  //     });
  // }

}
