import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

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
  async getCart(): Promise<Observable<ShoppingCart>> {
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' +cartId).valueChanges()
    .pipe(map((x:any) => new ShoppingCart(x.items)));
}

private getItem(cartId: string, productId: string) {
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

//this method is getting the reference of shopping cart
  private async getOrCreateCartId(): Promise<string> {
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
    this.updateItemQuantity(product, 1);
  }
  //delete and decrease the quantity
  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    //getting ref to the users shopping cart
    //await is for awaiting to get the result of 'getOrCreateCartId()'
    let cartId = await this.getOrCreateCartId();
    //this gives an observable of shopping cart item 
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if(item) item$.update({quantity: item.quantity + change});
      else item$.set({product: product, quantity: change});
    });
  }
}
