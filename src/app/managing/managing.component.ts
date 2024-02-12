import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { matchValidator } from '../register/validator';
import { DataService } from '../shared/data.service';
import { ItemUpl } from './item-upl.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from './category.model';
import { Item } from './item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../products/items.service';
import { User } from '../user/user.model';

@Component({
    selector: 'app-managing',
    templateUrl: './managing.component.html',
    styleUrl: './managing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagingComponent {
    novi = true;
    edit = false;
    zapocniEdit = false;
    editRow: number | null = null;
    errorMessage: string = '';
    itemForm!: FormGroup;
    categories: Category[] = [];
    categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    items: Item[] = [];
    itemSubject: BehaviorSubject<Item[]> | null = null;
    subscription: Subscription | null = null;
    curUser: User | null = null;

    constructor(private router: Router, private auth: AuthService, private data: DataService, private itemService: ItemsService) { }
    ngOnInit(): void {
        this.curUser = this.auth.getUser();
        this.data.getCategories().subscribe(res => {
            this.categories = res;
            this.categorySubject.next(this.categories);
        });
        this.itemForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'carMake': new FormControl(null, [Validators.required]),
            'carModel': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required]),
            'brand': new FormControl(null, [Validators.required]),
            'oe_number': new FormControl(null, [Validators.required]),
            'category': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required]),
            'stock': new FormControl(null, [Validators.required]),
            'image': new FormControl(null, [Validators.required]),
        });
        this.itemSubject = this.itemService.getItems();
        this.subscription = this.itemSubject
            .subscribe(res => {
                this.items = res;
            });


        this.auth.errorEmitter
            .subscribe((error: string) => {
                this.errorMessage = error;
            });
    }

    name: string = '';
    carMake: string = '';
    carModel: string = '';
    description: string = '';
    brand: string = '';
    oe_number: string = '';
    price: number = 0;
    stock: number = 0;
    image: string = '';
    category: string = '';

    onFileSelected(file: HTMLInputElement): void {
        this.image = file.value.substring(12);
    }



    submit() {
        this.itemService.newItem(this.itemForm.value, this.image);
        this.itemForm.reset();
    }
    editItem(item: Item) {
        this.data.itemToEdit = item;
        this.router.navigate(['/edit']);
    }
}
