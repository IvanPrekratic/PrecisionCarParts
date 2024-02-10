import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../user/user.model';
import { Order } from '../cart/order.model';
import { AuthService } from '../shared/auth.service';
import { ItemsService } from '../products/items.service';
import { CartElement } from '../cart/cart.element';

@Component({
	selector: 'app-order-view',
	templateUrl: './order-view.component.html',
	styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
	constructor(private route: ActivatedRoute, private auth: AuthService, private itemService: ItemsService) { }
	private sub: any;
	orderId: string = '';
	curUser: User | null = null;

	totalPrice: number = 0;
	orders: Order[] = [];
	userOrders: Order[] = [];
	cartElements: CartElement[] = [];
	orderSubject: BehaviorSubject<Order[]> | null = null;
	subscriptionorder: Subscription | null = null;
	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.orderId = params['id'];
		});
		this.curUser = this.auth.getUser();
		this.orderSubject = this.itemService.getOrders();
		this.subscriptionorder = this.orderSubject
			.subscribe(res => {
				this.orders = res;
				this.userOrders = this.orders.filter((order) => order.orderId === this.orderId)
				this.cartElements = this.userOrders.at(0)?.cartItems as CartElement[];
			});
		this.cartElements.forEach(item => {
			this.totalPrice += item.item?.price! * item.quantity;
		});
	}
}
