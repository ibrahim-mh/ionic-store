import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public categories = [];
  public loadingCategories:boolean;
  public featuredProducts = [];
  public loadingfeaturedProducts:boolean;
  public bestSellProducts = [];
  public loadingbestSellProducts:boolean;
  public subs=new Array<Subscription>();
  constructor(
    private data: DataService,
  ) { }
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.subs.push(this.data.getCategories().subscribe((data)=>{
        this.categories = data;
        this.loadingCategories=false;
      }));
      this.subs.push(this.data.getFeaturedProducts().subscribe((data)=>{
        this.featuredProducts = data;
        this.loadingbestSellProducts=false;
      }));
      this.subs.push(this.data.getBestSellProducts().subscribe((data)=>{
        this.bestSellProducts = data;
        this.loadingfeaturedProducts=false;
      }));
    }, 2000);
    this.loadingCategories=true;
    this.loadingbestSellProducts=true;
    this.loadingfeaturedProducts=true;
 
  }
  
}
