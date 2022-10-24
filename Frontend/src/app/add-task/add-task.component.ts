import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  name: any = '';
  error: any = '';
  taskname: any = '';
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
    console.log(this.name);
  }

  addTasks() {
    console.log("Adding Tasks");

    this.http.post<{ message: any, isUpdated: any }>('http://localhost:8000/addTasks', { name: this.name, task: this.taskname })
      .subscribe(res => {
        console.log("received response from server", res);
        if (res && res.message) {
          this.error = res.message;
        } else if (res && res.isUpdated) {
          console.log(res);
          this.router.navigate(['home/' + this.name]);
        }
      })
  }

  signOut() {
    console.log("signing out !!");
    sessionStorage.removeItem('loggedInUserName');
    this.socialAuthService.signOut();
    this.router.navigate(['sign-in']);
  }
}
