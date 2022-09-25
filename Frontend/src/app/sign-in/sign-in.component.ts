import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private router: Router, private http: HttpClient) { }
  socialUser: any;
  name: string = '';
  password: string = '';

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (this.socialUser) {
        console.log("user:", this.socialUser);
        sessionStorage.setItem('loggedInUserName', this.socialUser.name);
        this.router.navigate(['home', this.socialUser.name]);
      } else {
        console.log("user not logged in yet !!");
      }
    });
  }

  userLogin() {
    console.log("logging in:", this.name, this.password);
  
    this.http.post<{isLogIn: any}>('http://localhost:8000/userLogin', { name: this.name, password: this.password })
      .subscribe(res => {
        console.log("received response from server", res);
        if (res && res.isLogIn) {
          sessionStorage.setItem('loggedInUserName', this.name);
          this.router.navigate(['home', this.name]);
        } else {
          console.log("error logging in !");
        }
      })
    
  }

}
