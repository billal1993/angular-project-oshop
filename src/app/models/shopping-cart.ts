import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    constructor(public items: ShoppingCartItem[]) {}

    //getting id of all the products in this shopping cart
    get productIds() {
        //here we get all the items and return them in an array 
        return Object.keys(this.items);
    }

    get totalItemsCount() { 
        let count = 0;
        for(let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
    
}