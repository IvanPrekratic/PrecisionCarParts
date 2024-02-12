import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import { ItemsService } from '../products/items.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Order } from '../cart/order.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {

	constructor(private auth: AuthService, private itemService: ItemsService, private router: Router) { }

	curUser: User | null = null;
	hovered: boolean = false;
	style: any;

	orders: Order[] = [];
	userOrders: Order[] = [];
	orderSubject: BehaviorSubject<Order[]> | null = null;
	subscriptionorder: Subscription | null = null;

	ngOnInit() {
		this.curUser = this.auth.getUser();
		this.orderSubject = this.itemService.getOrders();
		this.subscriptionorder = this.orderSubject
			.subscribe(res => {
				this.orders = res;
				this.userOrders = this.orders.filter((order) => order.user?.userID === this.curUser?.userID);
			});
	}
	ngOnDestroy() {
		if (this.subscriptionorder)
			this.subscriptionorder.unsubscribe();
	}
	vracaStyle() {
		if (!this.hovered) {
			this.style = {
				'border-right': '3px solid #5E5E5E'
			};
			return this.style;
		} else {
			return;
		}
	}
	naElement(orderId: string | undefined) {
		console.log(orderId)
		this.router.navigate(['account/', orderId]);
	}

}
