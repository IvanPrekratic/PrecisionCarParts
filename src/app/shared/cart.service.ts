import { Injectable } from '@angular/core';
import { CartElement } from '../cart/cart.element';
import { Item } from '../managing/item.model';
import { findIndex } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    itemsInCart: CartElement[] = [];

    addToCart(item: Item, quantity: number) {
        let postoji = false;
        let cartItem = new CartElement(item, quantity);
        this.itemsInCart.forEach(element => {
            if (element.item === cartItem.item) {
                postoji = true;
                element.quantity += cartItem.quantity;
            }
        });
        if (postoji === false) {
            this.itemsInCart.push(cartItem);
        }
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
        console.log(this.itemsInCart)
    }
    retrieveFromCart() {
        let u = localStorage.getItem('cart');
        this.itemsInCart = JSON.parse(u as string) as CartElement[];
        return this.itemsInCart;
    }
    removeFromCart(item: CartElement) {
        this.itemsInCart.splice(this.itemsInCart.indexOf(item), 1);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
    }
}
