import { Injectable } from '@angular/core';
import { Item } from '../managing/item.model';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    items: Item[] = [];
    itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

    constructor(private dataService: DataService) {
        this.init()
    }

    init() {
        this.dataService.getItems()
            .subscribe(res => {
                this.items = res;
                this.itemSubject.next(this.items);
            })
    }
    getPosts() {
        return this.itemSubject;
    }
    deletePost(id: string) {
        this.dataService.deleteItem(id)
            .subscribe((res => {
                this.items = this.items.filter(c => c.itemID != id);
                this.itemSubject.next(this.items);
            }));
    }
    editPost(item: Item) {
        this.dataService.editItem(item)
            .subscribe((res => {
                this.items[this.items.findIndex(c => c.itemID == item.itemID)] = item;
            }), error => {
                console.log(error);
            });
    }
}
