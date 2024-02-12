import { Component, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { CartElement } from './cart.element';
import { CartService } from '../shared/cart.service';
import { User } from '../user/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { DataService } from '../shared/data.service';
import { Order } from './order.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    constructor(private router: Router, private auth: AuthService, private cartService: CartService, private data: DataService) { }

    curUser: User | null = null;
    itemsInCart: CartElement[] = [];
    totalPrice: number = 0;

    items: Item[] = [];
    itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

    ngOnInit() {
        this.data.getItems()
            .subscribe(res => {
                this.items = res;
                this.itemSubject.next(this.items);
            });
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
        this.data.addOrder(new Order(this.itemsInCart, this.curUser as User, new Date));
        this.itemsInCart.forEach(item => {
            let newItem: Item = new Item(item.item?.name as string, item.item?.carMake as string, item.item?.carModel as string,
                item.item?.description as string, item.item?.brand as string, item.item?.oe_number as string,
                item.item?.price as number, item.item?.stock as number - item.quantity, item.item?.image as string,
                item.item?.category as string, item.item?.itemID as string);
            this.data.editItem(newItem).subscribe((res => {
                this.items[this.items.findIndex(c => c.itemID == newItem.itemID)] = newItem;
            }), error => {
                console.log(error);
            });;
        })
        let data = document.getElementById('contentToConvert');
        html2canvas(data as HTMLElement).then(canvas => {
            let imgWidth = 208;
            let pageHeight = 295;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jspdf('p', 'mm', 'a4');
            let position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('Order_confirmation.pdf');
        });
        this.itemsInCart = [];
        this.cartService.clearCart();
    }

}
