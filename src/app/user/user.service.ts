import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
    userSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


    constructor(private http:HttpClient, private dataService:DataService) {
       this.init()
    }

    init(){

        this.dataService.getUsers()
            .subscribe(res => {
                this.users=res;
                this.userSubject.next(this.users);
            })
  
    }

    getUsers(){
        return this.userSubject;
    }

}
