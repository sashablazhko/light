import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authRegister$.subscribe(data => {
      this.successMessage = 'You have successfully registered and logged in';
      this.clearMessages();
    });
  }

  /**
   * Clear all messages after 5 seconds
   */
  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }
}
