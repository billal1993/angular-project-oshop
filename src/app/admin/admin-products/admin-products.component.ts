import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {title: string}[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    //getting all products in products array
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products =products);
   }
   //to filter the objects
   filter(query: string){
    this.filteredProducts = (query) ?
    //if there is something in query then
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    //otherwise do this
      this.products;
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

  ngOnInit() {
  }

}
