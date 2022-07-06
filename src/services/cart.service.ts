import { Injectable } from '@angular/core';
import { ICategory } from 'src/models/ICategory';
import { IProduct } from 'src/models/IProduct';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';
import { ICart } from 'src/models/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,private util:UtilService) { }

  private getCarts(userId):Observable<Array<ICart>> {
    return this.http.get(`${this.util.getBaseURL()}/carts/user/${userId}`).pipe(
      map((results:Array<ICart>) => results));
  }
  private newCart(cart:ICart):Observable<ICart> {
    return this.http.post(`${this.util.getBaseURL()}/carts/`,cart).pipe(
      map((result:ICart) => result));
  }
  private updateCart(cart:ICart):Observable<ICart> {
    return this.http.put(`${this.util.getBaseURL()}/carts/${cart.id}`,cart).pipe(
      map((result:ICart) => result));
  }
}
