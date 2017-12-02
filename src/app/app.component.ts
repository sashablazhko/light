import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Product } from './shared/models/product';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-my',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  products: Product[];

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.service.getProducts()
      .subscribe(products => this.products = products);
  }

}
