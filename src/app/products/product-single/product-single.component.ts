import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  templateUrl: 'product-single.component.html'
})
export class ProductSingleComponent implements OnInit {
  constructor(

  ) {}

  ngOnInit() {}

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
