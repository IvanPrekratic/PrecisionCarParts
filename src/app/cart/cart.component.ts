import { Component, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { CartElement } from './cart.element';
import { CartService } from '../shared/cart.service';
import { User } from '../user/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    constructor(private router: Router, private auth: AuthService, private cartService: CartService) { }

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
        this.totalPrice -= item.item?.price! * item.quantity;
    }

    backToItems() {
        this.router.navigate(['/products']);
    }

    checkout() {
        let data = document.getElementById('contentToConvert');
        html2canvas(data as HTMLElement).then(canvas => {
            // Few necessary setting options  
            let imgWidth = 208;
            let pageHeight = 295;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            let position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('Order.pdf'); // Generated PDF   
        });
    }

}
