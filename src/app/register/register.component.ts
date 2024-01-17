import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { matchValidator } from './validator';

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
    
    username: String = '';
    password1: String = '';
    password2: String = '';
    name: String = '';

    submit() {
        this.auth.register(this.registerForm.value);
        this.router.navigate(['/']);
    }
}
