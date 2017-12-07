import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedId: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts()
      .subscribe(products => this.products = products);
  }

  onSelect(selected: Product) {
    this.router.navigate(['/products', selected.id]);
    this.selectedId = selected.id;
  }

  isSelected(product) {
    return product.id == this.selectedId;
  }

}
