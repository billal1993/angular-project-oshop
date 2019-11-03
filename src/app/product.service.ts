import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  add(product){
    //for adding to firebase database
    return this.db.list('/products').push(product);
  }
//getting all the products from database
  getAll(){
    return this.db.list('/products')
    .snapshotChanges().pipe(
      map((products:any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }
}
