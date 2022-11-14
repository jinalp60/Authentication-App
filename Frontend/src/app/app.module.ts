import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SocialAuthServiceConfig, SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { LoginService } from '../app/login.service';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from '../app/auth-guard.guard';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { UpdateGalleryPhotoComponent } from './update-gallery-photo/update-gallery-photo.component';
import { DeletePhotoDialogComponent } from './delete-photo-dialog/delete-photo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    UpdateDetailsComponent,
    UploadPhotoComponent,
    ManageTasksComponent,
    AddTaskComponent,
    PhotoGalleryComponent,
    AddPhotoComponent,
    UpdateGalleryPhotoComponent,
    DeletePhotoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDialogModule,
    SocialLoginModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, AuthGuardGuard, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('260748515401-befa3gdpct2iqkirqul8ja5mdfv0fkj0.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent],
  entryComponents: [UpdateGalleryPhotoComponent]
})
export class AppModule { }
