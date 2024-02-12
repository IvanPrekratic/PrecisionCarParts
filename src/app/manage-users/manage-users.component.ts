import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: "Change role?",
            text: `You will give admin permissions to ${user.username}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change role!"
        }).then((result) => {
            if (result.isConfirmed) {
                user.admin = 1;
                this.data.editUser(user);
                Swal.fire({
                    title: "Success!",
                    text: `User ${user.username} is now admin!`,
                    icon: "success"
                });
            }
        });
    }

    makeUser(user: User) {
        Swal.fire({
            title: "Change role?",
            text: `You will take admin permissions from ${user.username}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change role!"
        }).then((result) => {
            if (result.isConfirmed) {
                user.admin = 0;
                this.data.editUser(user);
                Swal.fire({
                    title: "Success!",
                    text: `User ${user.username} is now user!`,
                    icon: "success"
                });
            }
        });
    }

    deleteUser(user: User) {
        let username = user.username
        Swal.fire({
            title: "Delete user?",
            text: `Do you want to delete user ${username}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete user!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.users.forEach((element, index) => {
                    if (element === user)
                        this.users.splice(index, 1);
                });
                console.log(user.userID)
                this.auth.deleteUser(user.userID);
                Swal.fire({
                    title: "Success!",
                    text: `User ${username} is deleted!`,
                    icon: "success"
                });
            }
        });

    }

}
