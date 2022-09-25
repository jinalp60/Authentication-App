import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, Observer } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit {

  error: string = '';
  name: any ;
  phone: string = '';
  email: string = '';
  bio: string = '';
  imageToShow:any;
  imagePath:string='';
  data: any ;

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) {}

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
        //if(res.hasOwnProperty('imagePath')){
         // this.imagePath=this.data.imagePath;
          //}
        //else{
         // this.imagePath="http://127.0.0.1:8080/src/assets/User_dp/Photo.jpg";
        //}
      })
    }

  update() {
    console.log('logging in user', this.name, this.phone, this.email, this.bio,this.imagePath);
    this.http.patch<{message: any}>('http://localhost:8000/updateUserProfile', { name: this.name, phone: this.phone, email: this.email, bio: this.bio,imagePath:this.imagePath })
      .subscribe(res => {
        console.log("received response from server", res);
        
        if(res && res.message) {
          this.error = res.message;
          
          
        }
        this.http.get<{isLogIn: any}>('http://localhost:8000/getUserProfile/'+this.name)
      .subscribe(res => {
        console.log("received response from server", res);
        console.log(this.imagePath)
      this.data=res;
      this.name=this.data.name;
      this.phone=this.data.phone;
      this.email=this.data.email;
      this.bio=this.data.bio;
       this.imagePath=this.data.imagePath;
      })
      })
      
  }
  }

