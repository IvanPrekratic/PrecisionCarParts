import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../products/items.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../user/user.model';
import { DataService } from '../shared/data.service';
import { Md5 } from 'ts-md5';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
	constructor(private auth: AuthService, private itemService: ItemsService, private data: DataService) { }
	hovered: boolean = false;
	style: any;
	curUser: User | null = null;
	name: string | undefined;
	username: string | undefined;
	email: string | undefined;
	passwordOld: string = '';
	passwordNew: string = '';
	passwordConf: string = '';

	changeName: boolean = false;
	changeUsername: boolean = false;
	changeEmail: boolean = false;
	changePassword: boolean = false;

	ngOnInit() {
		this.curUser = this.auth.getUser();
	}
	vracaStyle() {
		if (!this.hovered) {
			this.style = {
				'border-right': '3px solid #5E5E5E'
			};
			return this.style;
		} else {
			return;
		}
	}

	nameChange() {
		Swal.fire({
			title: "Change name?",
			text: "You will be logged out",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change name!"
		}).then((result) => {
			if (result.isConfirmed) {
				let user = this.auth.getUser()
				user.name = this.name as string;
				this.data.editUser(user);
				this.auth.logout();
				Swal.fire({
					title: "Success!",
					text: "Your name has been changed.",
					icon: "success"
				});
			}
		});

	}

	usernameChange() {
		Swal.fire({
			title: "Change username?",
			text: "You will be logged out",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change username!"
		}).then((result) => {
			if (result.isConfirmed) {
				let user = this.auth.getUser()
				user.username = this.username as string;
				this.data.editUser(user);
				this.auth.logout();
				Swal.fire({
					title: "Success!",
					text: "Your username has been changed.",
					icon: "success"
				});
			}
		});

	}

	emailChange() {
		Swal.fire({
			title: "Change email?",
			text: "You will be logged out",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change email!"
		}).then((result) => {
			if (result.isConfirmed) {
				let user = this.auth.getUser()
				user.email = this.email as string;
				this.data.editUser(user);
				this.auth.logout();
				Swal.fire({
					title: "Success!",
					text: "Your email has been changed.",
					icon: "success"
				});
			}
		});
	}

	passwordChange() {
		Swal.fire({
			title: "Change password?",
			text: "You will be logged out",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change password!"
		}).then((result) => {
			if (result.isConfirmed) {
				let user = this.auth.getUser();
				let newPasswordHash = Md5.hashStr(this.passwordNew);
				let oldPasswordHash = Md5.hashStr(this.passwordOld);
				console.log(user.password, newPasswordHash);
				if (user.password === oldPasswordHash) {
					if (this.passwordNew === this.passwordConf) {
						user.password = newPasswordHash;
						this.data.editUser(user);

						Swal.fire({
							title: "Success!",
							text: "Your password has been changed.",
							icon: "success"
						});
						this.auth.logout();
					}
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Wrong current password!",
					});
				}
			}
		});
	}
}
