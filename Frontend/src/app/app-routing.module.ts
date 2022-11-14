import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component'
import { AddPhotoComponent } from './add-photo/add-photo.component';

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
  },
  {
    path: 'home/:name/update', component: UpdateDetailsComponent
  },
  {
    path: 'home/:name/uploadPhoto', component: UploadPhotoComponent
  },
  {
    path: 'manage-tasks/:name', component: ManageTasksComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-tasks/:name', component: AddTaskComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'list-photos/:name', component: PhotoGalleryComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-photo/:name', component: AddPhotoComponent, canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
