import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { DataService } from '../shared/data.service';
import { Category } from '../managing/category.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

    constructor(private itemService: ItemsService, private dataService: DataService) { }


    items: Item[] = [];
    itemsToShow: Item[] = [];

    itemSubject: BehaviorSubject<Item[]> | null = null;
    subscription: Subscription | null = null;
    categories: Category[] = [];
    carMakes: string[] = [];
    carModels: string[] = [];
    categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

    ngOnInit() {
        //let cat = {name: 'steering & suspension'};
        //this.dataService.addCategory(cat);

        this.dataService.getCategories()
            .subscribe(res => {
                this.categories = res;
                this.categorySubject.next(this.categories);
            })
        this.itemSubject = this.itemService.getItems();
        this.subscription = this.itemSubject
            .subscribe(res => {
                this.items = res;
                this.itemsToShow = this.items;
                console.log(this.items)
            });

        setTimeout(() => {
            this.items.forEach(item => {
                if (this.carMakes.indexOf(item.carMake) == -1) {
                    this.carMakes.push(item.carMake);
                }
            });
            this.items.forEach(item => {
                if (this.carModels.indexOf(item.carModel) == -1) {
                    this.carModels.push(item.carModel);
                }
            });
        }, 200);
    }
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
    filterByCategory(cat: string) {
        this.itemsToShow = this.itemsToShow.filter(itm => itm.category === cat);
    }
    filterByMake(make: string) {
        this.itemsToShow = this.itemsToShow.filter(itm => itm.carMake === make);
        this.carModels = [];
        this.items.forEach(item => {
            if (this.carModels.indexOf(item.carModel) == -1 && item.carMake === make) {
                this.carModels.push(item.carModel);
            }
        });
    }
    filterByModel(model: string) {
        this.itemsToShow = this.itemsToShow.filter(itm => itm.carModel === model);
    }
    removeFilters(){
        this.itemsToShow = this.items;
        this.carModels = [];
        this.items.forEach(item => {
            if (this.carModels.indexOf(item.carModel) == -1) {
                this.carModels.push(item.carModel);
            }
        });
    }
    addToCart(itemId: string){
        
    }
}
