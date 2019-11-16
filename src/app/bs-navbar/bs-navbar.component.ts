import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

import { ShoppingCartService } from '../shopping-cart.service';

import { AngularFireObject } from '@angular/fire/database';
import { AppUser } from '../models/app-users';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;


  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
   
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    //getting the cart from cart service
    //and adding the qunatity into it
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout(){
    this.auth.logout();
  }

}
