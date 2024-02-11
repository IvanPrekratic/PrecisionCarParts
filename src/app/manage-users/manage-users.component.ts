import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
    constructor(private auth: AuthService, private userService: UserService, private data: DataService) { }
    hovered: boolean = false;
    style: any;
    curUser: User | null = null;

    users: User[] = [];
    userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    subscription: Subscription | null = null;

    ngOnInit() {
        this.curUser = this.auth.getUser();
        this.userSubject = this.userService.getUsers();
        this.subscription = this.userSubject
            .subscribe(res => {
                this.users = res;
            });
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

    makeAdmin(user: User) {
        user.admin = 1;
        this.data.editUser(user);
    }

    makeUser(user: User) {
        user.admin = 0;
        this.data.editUser(user);
    }

    deleteUser(user: User) {
        this.users.forEach((element, index) => {
            if (element === user)
                this.users.splice(index, 1);
        });
        console.log(user.userID)
        this.auth.deleteUser(user.userID);
    }

}
