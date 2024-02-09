import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../user/user.model';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {

    broj: string = '';
    constructor(public router: Router, public auth: AuthService) { }

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
    }
    reRoute(ruta: string) {
        this.router.navigate([ruta]);
    }
    searchByPartNumber() {
        console.log(this.broj);

    }
}
