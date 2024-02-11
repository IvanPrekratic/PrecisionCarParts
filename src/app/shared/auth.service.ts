import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { UserService } from '../user/user.service';
import { UserReg } from '../user/user-reg.model';
import { ItemUpl } from '../managing/item-upl.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User | null = null;
    private token: string = '';
    errorEmitter: Subject<string> = new Subject<string>();
    authChange: Subject<boolean> = new Subject<boolean>();


    userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    subscription: Subscription | null = null;
    users: User[] = [];


    constructor(private router: Router, private data: DataService, private userService: UserService) { }


    login(credentials: { username: string, password: string }) {
        this.userSubject = this.userService.getUsers();
        this.subscription = this.userSubject
            .subscribe(res => {
                this.users = res;
            });

        new Observable(observer => {
            setTimeout(() => {
                let u = this.users.find(u => u.username == credentials.username && u.password == credentials.password);
                observer.next(u);
            }, 1000);
        }).subscribe((user: any) => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.authChange.next(true);
                setTimeout(() => { this.router.navigate(['/']) }, 300);


            } else {
                this.errorEmitter.next('Wrong credentials');
            }
        });
    }
    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.authChange.next(false);
        this.router.navigate(['/']);
    }

    register(credentials: { username: string, password: string, password2: string, name: string, email: string }) {
        let user: UserReg = new UserReg(credentials.username, credentials.password, credentials.name, credentials.email, 0);
        this.data.addUser(user);

    }
    getUser() {
        let u = localStorage.getItem('user');
        if (!this.user && u)
            this.user = JSON.parse(u);
        return { ...this.user } as User;
    }

    isAuthenticated() {
        return this.user != null;
    }

    deleteUser(userID: string) {
        this.data.deleteUser(userID)
            .subscribe((res => {
                this.users = this.users.filter(c => c.userID != userID);
                this.userSubject.next(this.users);
            }));
    }

}
