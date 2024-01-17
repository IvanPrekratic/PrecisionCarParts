import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{

    constructor(private itemService: ItemsService){}

    
    items: Item[] = [];
    itemSubject : BehaviorSubject<Item[]> | null=null;
    subscription : Subscription | null = null;

    ngOnInit() {
        this.itemSubject=this.itemService.getItems();
        this.subscription=this.itemSubject
            .subscribe(res => {
                this.items=res;
            });
    }
    ngOnDestroy() {
        if (this.subscription)
          this.subscription.unsubscribe();
    }

}
