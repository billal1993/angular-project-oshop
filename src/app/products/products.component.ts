//for displaying all products on home page
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
    //getting all products in products
    productService
    .getAll()
    //with this switchMap we can switch from one abservable to another
      //here we get all the products 
    .pipe(switchMap(products => {
      this.products = products;
      //here switching to another observable
      return route.queryParamMap;
    }))
      //getting route parameters
     .subscribe(params => {
        this.category = params.get('category');
        //now here filter applied
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
    });
  }
//getting cart 
 async ngOnInit() {
   this.subscription = (await this.shoppingCartService.getCart())
   .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
