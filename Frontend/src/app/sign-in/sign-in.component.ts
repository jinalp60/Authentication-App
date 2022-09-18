import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private router: Router) { }
  socialUser: any;
  name: string = '';
  password: string = '';

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (this.socialUser) {
        console.log("user:", this.socialUser);
        sessionStorage.setItem('loggedInUserName',this.socialUser.name);
        this.router.navigate(['home', this.socialUser.name]);
      } else {
        console.log("user not logged in yet !!");
      }
    });
  }

  userLogin() {
    console.log("logging in:", this.name, this.password);
    if (this.name == 'admin' && this.password == 'admin') {
      sessionStorage.setItem('loggedInUserName',this.name);
      this.router.navigate(['home', this.name]);
    } else {
      console.log("error logging in !");
    }
  }

}
