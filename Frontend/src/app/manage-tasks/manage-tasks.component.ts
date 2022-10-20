import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

export interface PeriodicElement {
  position: number;
  name: string;
  status: number;
}

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss']
})
export class ManageTasksComponent implements OnInit {

  name: any = '';
  error: any = '';
  allTasks: PeriodicElement[] = [];
  activeTasks: PeriodicElement[] = [];
  completedTasks: PeriodicElement[] = [];
  displayedColumnsActive: string[] = ['position', 'name', 'status', 'select'];
  displayedColumnsCompleted: string[] = ['position', 'name', 'status', 'select'];
  displayedColumns: string[]= ['position', 'name', 'status'];
  activeSelection = new SelectionModel<PeriodicElement>(true, []);
  completedSelection = new SelectionModel<PeriodicElement>(true, []);
  searchTerm: any = '';
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('name')) {
      this.name = this.route.snapshot.paramMap.get('name')
    }
    console.log(this.name);

    this.refreshTasks();
  }

  refreshTasks() {
    this.http.get<{ tasks: any, isUserFound: any }>('http://localhost:8000/getUserTasks/' + this.name)
      .subscribe(res => {
        console.log("received response from server", res);
        if (res && res.isUserFound) {

          let stringifiedTasks = JSON.stringify(res.tasks);

          this.allTasks = JSON.parse(stringifiedTasks);
          this.allTasks = this.allTasks.map((obj, index) => {
            obj.position = index + 1;
            return obj;
          })
          console.log("all tasks:", this.allTasks);

          
          this.activeTasks = JSON.parse(stringifiedTasks);
          this.activeTasks = this.activeTasks.filter((task: any) => task.status == "active");
          
          this.activeTasks = this.activeTasks.map((obj,index) => {
            obj.position = index + 1;
            return obj;
          })
          console.log("active tasks:", this.activeTasks);


          this.completedTasks = JSON.parse(stringifiedTasks);
          this.completedTasks = this.completedTasks.filter((task: any) => task.status == "completed");
          
          this.completedTasks = this.completedTasks.map((obj, index) => {
            obj.position = index + 1;
            return obj;
          })
          console.log("completed tasks:", this.completedTasks);
        }

      })
  }

  isAllSelectedActive() {
    const numSelected = this.activeSelection.selected.length;
    const numRows = this.activeTasks.length;
    return numSelected === numRows;
  }

  masterToggleActive() {
    this.isAllSelectedActive() ?
      this.activeSelection.clear() :
      this.activeTasks.forEach(row => this.activeSelection.select(row));
  }

  checkboxLabelActive(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelectedActive() ? 'select' : 'deselect'} all`;
    }
    return `${this.activeSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isAllSelectedCompleted() {
    const numSelected = this.completedSelection.selected.length;
    const numRows = this.completedTasks.length;
    return numSelected === numRows;
  }

  masterToggleCompleted() {
    this.isAllSelectedCompleted() ?
      this.completedSelection.clear() :
      this.completedTasks.forEach(row => this.completedSelection.select(row));
  }

  checkboxLabelCompleted(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelectedCompleted() ? 'select' : 'deselect'} all`;
    }
    return `${this.completedSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  completeSelectedTasks(){
    console.log("Completing Tasks", this.activeSelection.selected);

    this.http.post<{message: any, isUpdated: any}>('http://localhost:8000/completeTasks', { name: this.name, tasks: this.activeSelection.selected})
      .subscribe(res => {
        console.log("received response from server", res);
        if(res && res.message) {
          this.error = res.message;
        } else if(res && res.isUpdated) {
          this.refreshTasks();
        }
      })
  }

  removeSelectedTasks(){
    console.log("Removing Tasks", this.completedSelection.selected);

    this.http.post<{message: any, isUpdated: any}>('http://localhost:8000/removeTasks', { name: this.name, tasks: this.completedSelection.selected})
      .subscribe(res => {
        console.log("received response from server", res);
        if(res && res.message) {
          this.error = res.message;
        } else if(res && res.isUpdated) {
          this.refreshTasks();
        }
      })
  }


}
