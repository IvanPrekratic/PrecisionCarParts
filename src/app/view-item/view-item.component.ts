import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../managing/item.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from '../products/items.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import Swal from 'sweetalert2';
import { CartService } from '../shared/cart.service';

@Component({
	selector: 'app-view-item',
	templateUrl: './view-item.component.html',
	styleUrl: './view-item.component.css'
})
export class ViewItemComponent {
	constructor(private auth: AuthService, private itemService: ItemsService, private route: ActivatedRoute, private cartService: CartService) { }
	private sub: any;
	curUser: User | null = null;
	itemId: string = '';
	item: Item | null = null;
	items: Item[] = [];
	itemsToShow: Item[] = [];
	kolicina: number = 1;

	itemSubject: BehaviorSubject<Item[]> | null = null;
	subscription: Subscription | null = null;



	ngOnInit() {
		this.curUser = this.auth.getUser();
		this.sub = this.route.params.subscribe(params => {
			this.itemId = params['id'];
		});
		this.itemSubject = this.itemService.getItems();
		this.subscription = this.itemSubject
			.subscribe(res => {
				this.items = res;
				this.item = this.items.find(item => item.itemID === this.itemId) as Item;
			});
	}
	ngOnDestroy() {
		if (this.subscription)
			this.subscription.unsubscribe();
	}
	addToCart(item: Item) {
		if (this.auth.isAuthenticated() === false) {
			Swal.fire({
				title: "Can't add to cart!",
				text: "To add items in cart you have to login",
				icon: "error"
			});
		} else {
			if (this.kolicina > item.stock) {
				Swal.fire({
					title: "Stock error",
					text: "Not enough items in stock!",
					icon: "warning"
				});
			} else {
				this.cartService.addToCart(item, this.kolicina);
				Swal.fire({
					title: "Success!",
					text: "Item is added to your cart!",
					icon: "success"
				});
			}
		}




	}
}
