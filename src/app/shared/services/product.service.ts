import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private productsUrl = 'http://smktesting.herokuapp.com/api/products/';

  constructor(private http: Http) {}

  /**
   * Get all product
   */
  getProducts(): Observable<Product[]> {
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    return this.http.get(this.productsUrl, { headers })
      .map(res => res.json())
      .map(products => products.map(this.toProduct))
      .catch(this.handleError);
  }

  /**
   * Get product by id
   */
  getProduct(id: number): Observable<Product> {
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    return this.http.get(this.productsUrl, { headers })
      .map(res => res.json())
      .map(product => product.map(this.toProduct))
      .map(product => product.find(x => x.id == id))
      .catch(this.handleError);
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
