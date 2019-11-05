//for displaying all products on home page
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) {
    //getting all products
    this.products$ = productService.getAll(); 
    //getting all categories
    this.categories$ = categoryService.getAll();
   }

}
