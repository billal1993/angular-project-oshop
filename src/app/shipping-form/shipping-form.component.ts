import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../models/shopping-cart';
// import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService){}
  ngOnInit() {
     //getting user ID
     this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  } 

  async placeOrder() {
    //storing to fb db
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping:this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalprice: i.totalPrice
        }
      })
    };
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  } 
}
