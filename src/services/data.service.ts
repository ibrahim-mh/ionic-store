import { Injectable } from '@angular/core';
import { ICategory } from 'src/models/ICategory';
import { IProduct } from 'src/models/IProduct';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient,private util:UtilService) { }
  private getrandom(min,max){
    return Math.floor(Math.random() * (max - min) +min)
  }

  getCategories():Observable<Array<ICategory>> {
    return this.http.get(`${this.util.getBaseURL()}/products/categories`).pipe(
      map((results:[]) => results.map((v,index)=>{ 
        let temp: ICategory = {
          id: index,
          name: v,
          image: `./assets/categories/category-${this.getrandom(1,4)}.png`
        }  
        return temp;
      })));
  }

  getFeaturedProducts():Observable<Array<IProduct>> {
    return this.http.get(`${this.util.getBaseURL()}/products`).pipe(
      map((results:Array<IProduct>)=> {return results}));
  }

  getBestSellProducts():Observable<Array<IProduct>> {
    return this.http.get(`${this.util.getBaseURL()}/products/category/jewelery`).pipe(
      map((results:Array<IProduct>)=> {return results}));
  }
}
