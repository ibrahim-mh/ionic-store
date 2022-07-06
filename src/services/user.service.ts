import { Injectable } from '@angular/core';
import { ICategory } from 'src/models/ICategory';
import { IProduct } from 'src/models/IProduct';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilService } from './util.service';
import { IUser } from 'src/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private util:UtilService) {
    let token = localStorage.getItem('token');
    if(token){
      this.setUserInfo().toPromise();
    }
   }
  private user = new BehaviorSubject<IUser>(null);
  login(username,password):Observable<any> {
    return this.http.post(`${this.util.getBaseURL()}/auth/login`,{
      username,
      password
  }).pipe(map((result:{token:string}) => {
        localStorage.setItem('token',result.token);
        return this.setUserInfo().toPromise(); 
      }));
  }

  private setUserInfo() {
    return this.http.get(`${this.util.getBaseURL()}/users/1`).pipe(
      map((result:IUser)=> {this.user.next(result); return true}));
  }

  getUserInfo() {
    return this.user;
  }
  logout(){
    localStorage.removeItem('token');
    this.user.next(null);
  }
}
