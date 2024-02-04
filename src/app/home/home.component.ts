import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{
    constructor(private auth: AuthService){}
    curUser: User | null = null;

    ngOnInit() {
        this.curUser = this.auth.getUser();
    }
    logout(){
        this.auth.logout();
    }
}
