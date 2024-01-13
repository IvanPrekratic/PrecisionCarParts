import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit{

    constructor(public router: Router) { }

    authenticated=false;


    ngOnInit(): void {
        //this.authenticated=this.auth.isAuthenticated();
   
        /*
        this.authChangeSubscription=this.auth.authChange
            .subscribe(res => {
              this.authenticated=this.auth.isAuthenticated();
            });
        */
     }
     getClass(a:string){
        return this.router.url==a ? 'active' : '';
      }
}
