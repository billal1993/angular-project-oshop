import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    //getting all products in products array
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.products =products

      this.initializeTable(products);
    });
  }

  private initializeTable(products:Product[]){
      //below lines are highly related and 
    //all about initializing data-table
      //initialize our table resource
      this.tableResource = new DataTableResource(products);
      //this method use to get all the records
      //for current page based on current parameter.
      this.tableResource.query({
        //this indicates that we wanna display records in page 1
        offset:0
      }).then(items => this.items = items);

      //this method returns total number of record in a table
      this.tableResource.count()
        .then(count => this.itemCount = count);
  }
  //this event is raised everytime one of the table parameters changes
  //when we change the page ,sort order or the page size
  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
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
