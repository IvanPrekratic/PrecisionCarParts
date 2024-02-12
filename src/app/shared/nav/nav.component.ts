import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../user/user.model';
import { ItemsService } from '../../products/items.service';
import { Item } from '../../managing/item.model';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {

    broj: string = '';
    constructor(public router: Router, public auth: AuthService, private itemService: ItemsService, private cartService: CartService) { }

    authenticated = false;
    authChangeSubscription: Subscription | null = null;



    ngOnInit() {
        this.authenticated = this.auth.isAuthenticated();

        this.authChangeSubscription = this.auth.authChange
            .subscribe(res => {
                this.authenticated = this.auth.isAuthenticated();
            });
        console.log('auth: ' + this.authenticated);
        console.log('suthserice: ' + this.auth.isAuthenticated());
    }
    getClass(a: string) {
        return this.router.url == a ? 'active' : '';
    }
    logout() {
        this.auth.logout();
        this.cartService.clearCart();
    }
    reRoute(ruta: string) {
        this.router.navigate([ruta]);
    }
    searchByPartNumber() {
        let item: Item
        console.log(this.broj);
        let items: Item[] = []
        let itemSubject: BehaviorSubject<Item[]> = this.itemService.getItems();
        let subscription: Subscription = itemSubject
            .subscribe(res => {
                items = res;
                let item: Item | undefined = items.find(item => item.oe_number === this.broj)
                this.router.navigate(['products', item!.itemID])
            });
    }
}
