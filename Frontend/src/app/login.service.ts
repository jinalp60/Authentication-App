import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;
  signInVarResult = false;

  constructor(private socialAuthService: SocialAuthService) { }

  getUser() {
    return this.user;
  }


}
