import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  password: string = '';
  error: string = '';
  name: string = '';
  phone: string = '';
  email: string = '';
  bio: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  userSignUp() {
    console.log('logging in user', this.name, this.phone, this.email, this.password, this.bio);
    this.http.post<{message: any}>('http://localhost:8000/registerUser', { name: this.name, phone: this.phone, email: this.email, password: this.password, bio: this.bio })
      .subscribe(res => {
        console.log("received response from server", res);
        if(res && res.message) {
          this.error = res.message;
        }
      })
  }

}
