import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Product } from './shared/models/product';
import { ProductService } from './shared/services/product.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-my',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  /**
   * Is the user logged in?
   */
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Log the user out
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
