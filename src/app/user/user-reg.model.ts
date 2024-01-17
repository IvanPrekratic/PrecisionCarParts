export class UserReg {
    username:string='';
    password:string='';
    name:string='';
    email:string='';
    admin:number=0;
    constructor(username: string, password: string, name: string, email: string, admin: number){
        this.username=username;
        this.password=password;
        this.name=name;
        this.email=email;
        this.admin=admin;
    }
}