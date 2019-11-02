import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //injecting firebase database
  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    //to return the list of categories from database
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name')
    }).valueChanges();
  }
}
