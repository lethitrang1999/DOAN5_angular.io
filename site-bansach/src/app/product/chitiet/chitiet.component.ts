import { BaseComponent } from '../../lib/base-component';
import { Component, OnInit, Injector } from '@angular/core';

import { Observable} from 'rxjs';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent extends BaseComponent implements OnInit {
  item:any;
  quantity: any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.item = {};
    this.quantity = 1;
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/item/get-by-id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.item = res;
        setTimeout(() => {
          this.loadScripts();
        });
      }); 
    });

  }
  addToCart(it) { 
    console.log(this.quantity);
    this._cart.addToCart(it, this.quantity);
    alert('Thêm thành công!'); 
  }
}
