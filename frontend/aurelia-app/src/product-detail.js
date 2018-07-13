import { inject, NewInstance } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
@inject(Router, I18N)
export class ProductDetail {
  constructor(router, i18n) {
    this.router = router;
    this.i18n = i18n;
    this.product = { 'name': '10 Litre Water', 'id': '3245627822' };
  }

  activate() {
  }

  attached() {
    this.callPractz();
  } 

  callPractz(productId, productName) {
    setTimeout(() => {    
      new Practz(this.product.id, this.product.name);
    //  new Practz(productId, productName);
    }, 10);
  }
}
