import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-photo-dialog',
  templateUrl: './delete-photo-dialog.component.html',
  styleUrls: ['./delete-photo-dialog.component.scss']
})
export class DeletePhotoDialogComponent implements OnInit {

  deletePhotoForm: any;
  password: any;

  constructor(private dialogRef: MatDialogRef<DeletePhotoDialogComponent>, private fb: FormBuilder) {
    this.deletePhotoForm = fb.group({
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  close() {
    console.log("closed");
    this.dialogRef.close();
  }

  delete() {
    console.log("deleting", this.password);
    this.dialogRef.close(this.password);
  }
}
