import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, Observer } from "rxjs";


@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit {

  error: string = '';
  name: string ='';
  phone: string = '';
  email: string = '';
  bio: string = '';
  imageToShow:any;
  imagePath:any;

  constructor() {}

  ngOnInit(): void {
  }

  update() {
    console.log('User details updated', this.name, this.phone, this.email, this.bio);
  }
}
