import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/product';
import { Review } from '../models/review';

@Injectable()
export class ProductService {
  private productsUrl = 'http://smktesting.herokuapp.com/api/products/';
  private reviewsUrl = 'http://smktesting.herokuapp.com/api/reviews/';
  private observableProd: Observable<Product[]>;

  constructor(private http: Http) {}

  /**
   * Get all product
   */
  getProducts(): Observable<Product[]> {
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    this.observableProd = this.http.get(this.productsUrl, { headers })
                            .map(res => res.json())
                            .map(products => products.map(this.toProduct))
                            .catch(this.handleError);
    return this.observableProd;
  }

  /**
   * Get product by id
   */
  getProduct(id: number): Observable<Product> {
    return this.observableProd
      .map(product => product.find(x => x.id == id))
      .catch(this.handleError);
  }

  /**
   * Get all reviews
   */
  getReviews(id: number): Observable<Review[]> {
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    return this.http.get(`${this.reviewsUrl}${id}`, { headers })
      .map(res => res.json())
      // .map(products => products.map(this.toProduct))
      .catch(this.handleError);
  }

  // /**
  //  * Send review
  //  */
  // sendReview(id: number, review: object): Observable<any> {
  //   const data = JSON.stringify(review);
  //   let headers = new Headers();
  //   let token   = localStorage.getItem('auth_token');
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', token);
  //   return this.http.post(`${this.reviewsUrl}${id}`, data, {headers: headers})
  //     .map(res => res.json())
  //     .do(res => {
  //       console.log(res);
  //     })
  //     .catch(this.handleError);
  // }
  /**
   * FAKE Send review
   */
  sendReview(id: number, review: object): void {
    const data = JSON.stringify(review);
    let token   = localStorage.getItem('auth_token');
    alert(`FAKE SEND REVIEW
    id_prod: ${id}
    token: ${token}
    data: ${data}`);
  }

  /**
   * Convert product info from the API to our standard/format
   */
  private toProduct(product): Product {
    return {
      id: product.id,
      title: product.title,
      img: 'http://smktesting.herokuapp.com/static/' + product.img,
      text: product.text
    };
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
}
