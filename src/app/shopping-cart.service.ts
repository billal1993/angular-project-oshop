import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  quantity = 0;

  constructor(private db: AngularFireDatabase) { }
//creating a new shopping cart
  private create() {
    //adding firebase db current date of shopping cart id
      return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
//method for reading the shopping cart from firebase
// private getCart(cartId: string) {
//   return this.db.object('/shopping-carts/' +cartId);
// }

private getItem(cartId: string, productId: string) {
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

//this method is getting the reference of shopping cart
  private async getOrCreateCartId() {
     //getting shopping cart id from local storage
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    //in TS if you have a asynchronous method that returns a promise
    //and you wanna call it like an sync method
    //you simply apply await and then 'async' with method
    let result = await this.create();
    //now store this new id in local storage
    localStorage.setItem('cardId', result.key);
    return result.key;
  }
  //add to shopping cart or increase its quantity
  async addToCart(product: Product) {
    //getting ref to the users shopping cart
    let cartId = await this.getOrCreateCartId();
    //this gives an observable of shopping cart item 
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if(item) item$.update({quantity: item.quantity + 1});
      else item$.set({product: product, quantity: 1});
    });
  }
}
