import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';


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
  sample:any='';
  data: any = '';
  
  imagePath: string= "";

  constructor(private route: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService,private http: HttpClient) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
    console.log(this.name);
    
    this.http.get<{isLogIn: any}>('http://localhost:8000/getUserProfile/'+this.name)
      .subscribe(res => {
        console.log("received response from server", res);
      this.data=res;
      this.name=this.data.name;
      this.phone=this.data.phone;
      this.email=this.data.email;
      this.bio=this.data.bio;
       this.imagePath=this.data.imagePath;
      })
      
      //this.phone=this.data.phone;

    
  }
  
  

  signOut() {
    console.log("signing out !!");
    sessionStorage.removeItem('loggedInUserName');
    this.socialAuthService.signOut();
    this.router.navigate(['sign-in']);
  }
  

}
