import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../products/items.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
	constructor(private auth: AuthService, private itemService: ItemsService) { }

	curUser: User | null = null;

	ngOnInit() {
		this.curUser = this.auth.getUser();
	}
}
