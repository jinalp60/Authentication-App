import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: any = '';
  error: string = '';
  phone: string = '';
  email: string = '';
  bio: string = '';
  
  imagePath: string= 'https://picsum.photos/id/237/200/300';

  constructor(private route: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
  }

  signOut() {
    console.log("signing out !!");
    sessionStorage.removeItem('loggedInUserName');
    this.socialAuthService.signOut();
    this.router.navigate(['sign-in']);
  }

}
