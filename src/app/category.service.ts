import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //injecting firebase database
  constructor(private db: AngularFireDatabase) { }

  getAll(){
    //to return the list of categories from database
    //and also the key of the categories from database
    return this.db.list('/categories', ref => {return ref.orderByChild('name')})
    //below part is for getting payload and key
      .snapshotChanges().pipe(
      map((categories: any[]) => categories.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }
}
