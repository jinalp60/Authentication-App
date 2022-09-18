import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  
  password: string = '';
  error: string = '';
  name: string ='';
  phone: string = '';
  email: string = '';
  bio: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  userSignUp() {
    console.log('logging in user', this.name, this.phone, this.email, this.password, this.bio);
  }
  loadSignIn(){
    
  }
}
