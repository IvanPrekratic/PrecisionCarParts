import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Md5 } from 'ts-md5';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    errorMessage: string = '';
    loginForm!: FormGroup;

    constructor(private router: Router, private auth: AuthService) { }
    ngOnInit(): void {

        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required])
        });

        this.auth.errorEmitter
            .subscribe((error: string) => {
                this.errorMessage = error;
            });
    }

    btnClick() {
        this.router.navigateByUrl('register');
    }
    submit() {
        let password: string = this.loginForm.get('password')!.value
        let hash: string = Md5.hashStr(password);
        this.loginForm.patchValue({ password: hash });
        this.auth.login(this.loginForm.value);
        this.loginForm.patchValue({ password: password });
    }
}
