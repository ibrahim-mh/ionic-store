import { Injectable } from '@angular/core';
import { ICategory } from 'src/models/ICategory';
import { IProduct } from 'src/models/IProduct';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UtilService } from './util.service';
import { IUser } from 'src/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private util:UtilService) { }

  private user = new Subject<IUser>();
  login(username,password):Observable<any> {
    return this.http.post(`${this.util.getBaseURL()}/auth/login`,JSON.stringify({
      username: username,
      password: password
  })).pipe(map((result:{token:string}) => {
        localStorage.setItem('token',result.token);
        return this.setUserInfo().toPromise();
      }));
  }

  private setUserInfo() {
    return this.http.get(`${this.util.getBaseURL()}/users/1`).pipe(
      map((result:IUser)=> {this.user.next(result); return true}));
  }

  getUserInfo() {
    return this.http.get(`${this.util.getBaseURL()}/products/category/jewelery`).pipe(
      map((results:Array<IProduct>)=> {return results}));
  }
}
