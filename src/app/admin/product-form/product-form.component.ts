import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  //injecting the category service
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { 
    //getting category from categoryService
    this.categories$ = categoryService.getAll();
    //this will get the id of product and
    //then store that product in product object
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).valueChanges().pipe(take(1))
      .subscribe(p => this.product = p);
     }
   //this method is called in product form on submit
   save(product){
     //if there is an Id from product
     //then Update else just simply add
     if(this.id) this.productService.update(this.id, product);
     else this.productService.add(product);
    this.router.navigate(['/admin/products']);
     }

    delete(){
      if(!confirm('Are you sure to delete this product?')) return;
        this.productService.delete(this.id);
        //redirecting to product list after deleting
        this.router.navigate(['/admin/products']);
    }

  ngOnInit() {
  }

}
