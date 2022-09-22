import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

  imagePath:String='';
  name:String='';

  constructor() { }

  ngOnInit(): void {
  }

  uploadphoto() {
    console.log('User details updated', this.imagePath);
  }
}
