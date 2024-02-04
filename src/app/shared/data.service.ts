import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserReg } from '../user/user-reg.model';
import { map } from 'rxjs/operators';
import { ItemUpl } from '../managing/item-upl.model';
import { Item } from '../managing/item.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient, private router: Router) { }

    addUser(user: UserReg) {
        return this.http.post('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/users.json', user).subscribe((res: any) => {
            console.log(res);
        });;
    }

    getUsers() {
        return this.http.get('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/users.json')
            .pipe(map((res: any) => {
                const users = [];
                for (let key in res) {
                    users.push({ ...res[key], id: key });
                }
                return users;
            }));
    }

    addItem(item: ItemUpl) {
        return this.http.post('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/items.json', item).subscribe((res: any) => {
            console.log(res);
        });
    }

    getItems() {
        return this.http.get('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/items.json')
            .pipe(map((res: any) => {
                const items = [];
                for (let key in res) {
                    items.push({ ...res[key], itemID: key });
                }
                return items;
            }));
    }

    deleteItem(itemID: string) {
        return this.http.delete(`https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/items/${itemID}.json`);
    }

    editItem(item: Item) {
        let novi: ItemUpl = new ItemUpl(item.name, item.carMake, item.carModel, item.description, item.brand, item.oe_number, item.price, item.stock, item.image, item.category);
        return this.http.patch(`https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/items/${item.itemID}.json`, novi);
    }

    getCategories() {
        return this.http.get('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
            .pipe(map((res: any) => {
                const categories = [];
                for (let key in res) {
                    categories.push({ ...res[key], categoryID: key });
                }
                return categories;
            }));
    }
    addCategory(object: any) {
        return this.http.post('https://jspro-16702-default-rtdb.europe-west1.firebasedatabase.app/categories.json', object).subscribe((res: any) => {
            console.log(res);
        });;
    }
}
