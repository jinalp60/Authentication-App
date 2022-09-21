import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  update() {
    console.log('User details updated', this.name, this.phone, this.email, this.bio);
  }
}
