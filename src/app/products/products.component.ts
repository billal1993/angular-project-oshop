//for displaying all products on home page
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
// import { Product } from 'shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
// import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
   
  }
//getting cart 
 async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart();
   this.populateProducts();
  }

  private populateProducts() {
    //getting all products in products
    this.productService
    .getAll()
    //with this switchMap we can switch from one abservable to another
      //here we get all the products 
    .pipe(switchMap(products => {
      this.products = products;
      //here switching to another observable
      return this.route.queryParamMap;
    }))
      //getting route parameters
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
    });
  }

  private applyFilter() {
    //now here filter applied
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
