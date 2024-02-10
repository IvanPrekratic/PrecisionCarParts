import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
	constructor(private auth: AuthService) { }
	curUser: User | null = null;
	ngOnInit() {
		this.curUser = this.auth.getUser();
	}

}
