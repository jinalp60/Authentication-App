import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  photolabel: string = '';
  name: any = '';
  photoPath: any = '';
  error: any = '';
  photoFile: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
    console.log(this.name);
  }

  addPhoto(): void {
    console.log("adding photo");
    this.http.post<{message: any}>('http://localhost:8000/addPhoto', { name: this.name, label: this.photolabel, imageUrl: this.photoPath})
      .subscribe(res => {
        console.log("received response from server", res);
        if(res && res.message) {
          this.error = res.message;
          this.router.navigate(['list-photos', this.name]);
        }
      })
  }

  onFileSelected(event: any) {
    console.log(event);
    const file: File = event.target.files[0];

    if (file) {
      // console.log("http://localhost:8081/" + file.name);
      this.photoPath = "http://localhost:8081/" + file.name;
    }

  }

  signOut() {
    console.log("signing out !!");
    sessionStorage.removeItem('loggedInUserName');
    this.socialAuthService.signOut();
    this.router.navigate(['sign-in']);
  }

}
