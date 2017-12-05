import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Review } from '../../shared/models/review';

@Component({
  selector: 'app-reviews-list',
  templateUrl: 'reviews-list.component.html',
  styleUrls: ['reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {
  reviews: any[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params['id']; // конвертируем значение параметра id в тип number
      this.productService
        .getReviews(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
        .subscribe(reviews => {
          this.reviews = reviews.reverse();
          // console.log(this.reviews);
        });
    });

  }



}
