import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts()
      .subscribe(products => this.products = products);
  }

}
