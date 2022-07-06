import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service'
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public user: UserService, public router: Router) {}
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {
    return this.user.getUserInfo().asObservable().pipe(map((user)=>{
            console.log(user);
            if(!user){
              this.router.navigate(['login']);
              return false;
            }
            return true;
        }));
    } 
}