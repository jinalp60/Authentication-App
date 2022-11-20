import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-gallery-photo',
  templateUrl: './update-gallery-photo.component.html',
  styleUrls: ['./update-gallery-photo.component.scss']
})
export class UpdateGalleryPhotoComponent implements OnInit {

  description: any;
  photoFile: any;
  photoPath: any;
  constructor(private dialogRef: MatDialogRef<UpdateGalleryPhotoComponent>) {
    
   }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    console.log(event);
    const file: File = event.target.files[0];

    if (file) {
      // console.log("http://localhost:8081/" + file.name);
      this.photoPath = "http://localhost:8081/" + file.name;
    }

  }

  close(){
    console.log("closed");
    this.dialogRef.close();
  }

  update(){
    console.log("updating" , this.photoPath);
    this.dialogRef.close(this.photoPath);
  }
}
