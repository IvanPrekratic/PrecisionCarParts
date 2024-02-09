import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { matchValidator } from './validator';
import { Md5 } from 'ts-md5';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
    errorMessage: string = '';
    registerForm!: FormGroup;

    constructor(private router: Router, private auth: AuthService) { }
    ngOnInit(): void {
        this.registerForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
            'password': new FormControl(null, [Validators.required]),
            'password2': new FormControl(null, [Validators.required, matchValidator('password')]),
            'name': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required]),
        });

        this.auth.errorEmitter
            .subscribe((error: string) => {
                this.errorMessage = error;
            });
    }

    username: string = '';
    password1: string = '';
    password2: string = '';
    name: string = '';

    submit() {
        let password: string = this.registerForm.get('password')!.value
        let hash: string = Md5.hashStr(password);
        this.registerForm.patchValue({ password: hash });
        this.auth.register(this.registerForm.value);
        this.registerForm.patchValue({ password: password });
        this.router.navigate(['/']);
    }
}
