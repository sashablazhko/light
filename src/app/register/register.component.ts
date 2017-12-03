import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  credentials = { username: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: AuthService,
              private router: Router) {}

  ngOnInit() {}

  /**
   * Login a user
   */
  register() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'You must enter Name and Password';
    }else {
      this.service.register(this.credentials.username, this.credentials.password)
        .subscribe(
          data => {
            if (data.success) {
              this.router.navigate(['']);
            }else {
              this.errorMessage = data.message;
            }

          },
          err => {
            console.error(err);
          }
        );
    }

  }
}
