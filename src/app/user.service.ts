import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-users';
// import { AppUser } from 'shared/models/app-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    //updating the user based on user id
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
  //its going to return an application user
  get(uid: string): AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }
}
