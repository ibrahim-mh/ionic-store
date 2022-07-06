import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isMenuEnabled = new Subject<boolean>();
  private BaseURL = "https://fakestoreapi.com";
  constructor() { }

  // Creating method to handle Side Menu State (Enabled or Disabeld)
  setMenuState(enabled) {
    this.isMenuEnabled.next(enabled);
  }

  // Method for get the Menu State
  getMenuState(): Subject<boolean> {
    return this.isMenuEnabled;
  }

  getBaseURL():string{
    return this.BaseURL;
  }
  getr(min,max){//random
    return Math.floor(Math.random() * (max - min) +min)
  }

}
