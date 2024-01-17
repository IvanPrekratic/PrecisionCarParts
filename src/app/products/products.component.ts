import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Item } from '../managing/item.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit{

    constructor(private itemService: ItemsService){}

    items: Item[] = [];
    itemSubject : BehaviorSubject<Item[]> | null=null;
    subscription : Subscription | null = null;

    ngOnInit() {
        this.itemSubject=this.itemService.getPosts();
        this.subscription=this.itemSubject
            .subscribe(res => {
                this.items=res;
            });
        console.log(this.items);
    }

}
