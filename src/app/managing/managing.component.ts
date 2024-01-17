import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { matchValidator } from '../register/validator';
import { DataService } from '../shared/data.service';
import { ItemUpl } from './item-upl.model';

@Component({
    selector: 'app-managing',
    templateUrl: './managing.component.html',
    styleUrl: './managing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagingComponent {
    errorMessage: string = '';
    itemForm!: FormGroup;

    constructor(private router: Router, private auth: AuthService, private data:DataService) { }
    ngOnInit(): void {
        this.itemForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
            'description': new FormControl(null, [Validators.required]),
            'brand': new FormControl(null, [Validators.required]),
            'oe_number': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required]),
            'stock': new FormControl(null, [Validators.required]),
            'image': new FormControl(null, [Validators.required]),
        });

        this.auth.errorEmitter
            .subscribe((error: string) => {
                this.errorMessage = error;
            });
    }

    name: String = '';
    description: String = '';
    brand: String = '';
    oe_number: string ='';
    price:number = 0;
    stock:number = 0;
    image:string = '';

    onFileSelected(file: HTMLInputElement): void {
        this.image = file.value.substring(12);
    }
    
    

    submit(){
        this.auth.newItem(this.itemForm.value, this.image);
        this.itemForm.reset(); 
    }
}
