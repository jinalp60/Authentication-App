import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UpdateGalleryPhotoComponent } from '../update-gallery-photo/update-gallery-photo.component';
import { DeletePhotoDialogComponent } from '../delete-photo-dialog/delete-photo-dialog.component';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  name: any = '';
  photos: any = [];
  data: any;
  error: any;
  displayedColumns: string[] = ['photo'];

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
    console.log(this.name);

    this.refreshPhotos();
  }

  refreshPhotos() {
    this.http.get<{ user: any, isUserFound: any }>('http://localhost:8000/getUserProfile/' + this.name)
      .subscribe(res => {
        console.log("received response from server", res);
        if (res && res.isUserFound) {
          this.data = res.user;
          this.photos = this.data.photos;
          console.log("photos:", this.photos);
        }

      })
  }

  updatePhotoDialog(photoIndex: any) {
    console.log(photoIndex);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
    // };

    const dialogRef = this.dialog.open(UpdateGalleryPhotoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data, photoIndex);
        if (data) {
          this.http.post<{ message: any }>('http://localhost:8000/updatePhoto', { name: this.name, photoIndex, imageUrl: data })
            .subscribe(res => {
              console.log("received response from server", res);
              if (res && res.message) {
                this.error = res.message;
                this.refreshPhotos();
              }
            })
        }
      }
    );
  }

  deletePhoto(photoIndex: any) {
    console.log(photoIndex);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
    // };

    const dialogRef = this.dialog.open(DeletePhotoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data, photoIndex);
        if (data) {
          this.http.post<{ message: any }>('http://localhost:8000/deletePhoto', { name: this.name, photoIndex, password: data })
            .subscribe(res => {
              console.log("received response from server", res);
              if (res && res.message) {
                this.error = res.message;
                this.refreshPhotos();
              }
            })
        }
      });



  }

  signOut() {
    console.log("signing out !!");
    sessionStorage.removeItem('loggedInUserName');
    this.socialAuthService.signOut();
    this.router.navigate(['sign-in']);
  }

}
