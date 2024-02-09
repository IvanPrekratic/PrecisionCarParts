import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../managing/item.model';
import { Router } from '@angular/router';
import { ItemsService } from '../products/items.service';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { User } from '../user/user.model';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrl: './edit-item.component.css'
})
export class EditItemComponent implements OnInit {
    constructor(private router: Router, private auth: AuthService, private data: DataService, private itemService: ItemsService) { }
    itemForm!: FormGroup;
    item!: Item;
    name!: string;
    carMake!: string;
    carModel!: string;
    description!: string;
    brand!: string;
    oe_number!: string;
    price!: number;
    stock!: number;
    image: string = '';
    category!: string;
    curUser: User | null = null;


    ngOnInit() {
        this.curUser = this.auth.getUser();
        this.item = this.data.itemToEdit;
        this.name = this.item.name;
        this.carMake = this.item.carMake;
        this.carModel = this.item.carModel;
        this.description = this.item.description;
        this.brand = this.item.brand;
        this.oe_number = this.item.oe_number;
        this.price = this.item.price;
        this.stock = this.item.stock;
        this.category = this.item.category;

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
    }


    submit() {
        if (this.image === '') {
            this.itemService.editItem(this.itemForm.value, this.item.image, this.item.itemID);
            this.itemForm.reset();
            this.router.navigate(['/managing']);
        } else {
            this.itemService.editItem(this.itemForm.value, this.image, this.item.itemID);
            this.itemForm.reset();
        }
    }

    onFileSelected(file: HTMLInputElement): void {
        this.image = file.value.substring(12);
    }
}
