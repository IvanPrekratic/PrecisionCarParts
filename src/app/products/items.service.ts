import { Injectable } from '@angular/core';
import { Item } from '../managing/item.model';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../shared/data.service';
import { ItemUpl } from '../managing/item-upl.model';

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
    getItems() {
        return this.itemSubject;
    }
    deleteItem(id: string) {
        this.dataService.deleteItem(id)
            .subscribe((res => {
                this.items = this.items.filter(c => c.itemID != id);
                this.itemSubject.next(this.items);
            }));
    }
    editItem(itemForm: { name: string, carMake: string, carModel: string, description: string, brand: string, oe_number: string, category: string, price: number, stock: number, image: string }, image: string, itemId: string) {
        let item: Item = new Item(itemForm.name, itemForm.carMake, itemForm.carModel, itemForm.description, itemForm.brand, itemForm.oe_number, itemForm.price, itemForm.price, image, itemForm.category, itemId);
        this.dataService.editItem(item)
            .subscribe((res => {
                this.items[this.items.findIndex(c => c.itemID == item.itemID)] = item;
            }), error => {
                console.log(error);
            });
    }
    newItem(itemInfo: { name: string, carMake: string, carModel: string, description: string, brand: string, oe_number: string, category: string, price: number, stock: number, image: string }, imagename: string) {
        let item: ItemUpl = new ItemUpl(itemInfo.name, itemInfo.carMake, itemInfo.carModel, itemInfo.description, itemInfo.brand, itemInfo.oe_number, itemInfo.price, itemInfo.stock, imagename, itemInfo.category);
        this.dataService.addItem(item);
    }
}
