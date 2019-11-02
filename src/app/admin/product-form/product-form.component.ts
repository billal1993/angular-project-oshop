import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  //injecting the category service
  constructor(categoryService: CategoryService, private productService: ProductService) { 
    //getting category from categoryService
    this.categories$ = categoryService.getCategories();
   }
   //this method is called in product form on submit
   save(product){
    //  console.log(product);
    this.productService.add(product);
     }

  ngOnInit() {
  }

}
