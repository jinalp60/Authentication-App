import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from  '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SocialAuthServiceConfig, SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { LoginService } from '../app/login.service';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from '../app/auth-guard.guard';
import {MatCardModule} from '@angular/material/card';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    UpdateDetailsComponent,
    UploadPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SocialLoginModule,
    MatCardModule,
    HttpClientModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
