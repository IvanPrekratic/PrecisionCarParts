import { Component, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { CartElement } from './cart.element';
import { CartService } from '../shared/cart.service';
import { User } from '../user/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    constructor(private auth: AuthService, private cartService: CartService) { }

    curUser: User | null = null;
    itemsInCart: CartElement[] = [];
    totalPrice: number = 0;
    ngOnInit() {
        console.log('evo me ')
        this.curUser = this.auth.getUser();
        this.itemsInCart = this.cartService.retrieveFromCart();
        this.itemsInCart.forEach(item => {
            this.totalPrice += item.item?.price! * item.quantity;
        });
        console.log(this.itemsInCart);
    }

    removeFromCart(item: CartElement) {
        this.cartService.removeFromCart(item)
        this.itemsInCart = this.cartService.retrieveFromCart();
    }

}
