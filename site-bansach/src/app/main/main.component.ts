import { BaseComponent } from './../lib/base-component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  list_item:any;
  list_km:any;
  list_menu: any;
  total:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('/api/item/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    Observable.combineLatest(
      this._api.get('/api/item/get-khuyenmai'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_km = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    Observable.combineLatest(
      this._api.get('/api/itemgroup/get-menu'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_menu = res[0];
      setTimeout(() => {
        this.total = res? res.length:0;
        this.loadScripts()
       
      });
    }, err => { });
  }
  
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
}
