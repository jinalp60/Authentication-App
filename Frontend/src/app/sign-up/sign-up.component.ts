import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  password: string = '';
  error: string = '';
  name: string = '';
  phone: string = '';
  email: string = '';
  bio: string = '';
  imagePath:string='';
  phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  isValidFormSubmitted = false; 



  constructor(private fb: FormBuilder,private http: HttpClient) { 
   
    this.form = fb.group({
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      name:[''],
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:[''],
      bio:[''],
      imagePath:['']
    })
    



  }
  get f(){
    return this.form.controls;
  }
 

  ngOnInit(): void {
  }

  userSignUp() { 
    console.log(this.form.controls['name'].value);
    console.log("hiii")
    this.http.post<{message: any}>('http://localhost:8000/registerUser', { name: this.form.controls['name'].value, phone: this.form.controls['phone'].value, email: this.form.controls['email'].value, password: this.form.controls['password'].value, bio: this.form.controls['bio'].value,imagePath:this.form.controls['imagePath'].value, photos:[]})
      .subscribe(res => {
        console.log("received response from server", res);
        if(res && res.message) {
          this.error = res.message;
        }
      })
  }

}
