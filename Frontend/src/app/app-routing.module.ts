import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full'

  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'home/:name', component: HomeComponent, canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
