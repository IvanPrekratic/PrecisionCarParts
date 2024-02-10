import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import { Item } from '../managing/item.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from '../products/items.service';
import { Router } from '@angular/router';
import { Order } from '../cart/order.model';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    constructor(private auth: AuthService, private itemService: ItemsService, private router: Router) { }
    curUser: User | null = null;
    items: Item[] = [];
    itemSubject: BehaviorSubject<Item[]> | null = null;
    subscription: Subscription | null = null;

    orders: Order[] = [];
    orderSubject: BehaviorSubject<Order[]> | null = null;
    subscriptionorder: Subscription | null = null;

    ngOnInit() {
        this.curUser = this.auth.getUser();
        this.itemSubject = this.itemService.getItems();
        this.subscription = this.itemSubject
            .subscribe(res => {
                this.items = res;
            });

        this.orderSubject = this.itemService.getOrders();
        this.subscriptionorder = this.orderSubject
            .subscribe(res => {
                this.orders = res;
                console.log(this.orders)
            });
    }
    logout() {
        this.auth.logout();
    }
    onItem(itemId: string) {
        this.router.navigate(['/products', itemId]);
    }
}
