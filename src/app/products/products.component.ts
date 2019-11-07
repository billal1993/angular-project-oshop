//for displaying all products on home page
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
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
}
