import { Component, Inject } from '@angular/core';
import { DialogI } from '../../interface/dialogs/dialogI.interface';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
    dialogSuccess: DialogI[] = [];
    //constructor( private matDialog:MatDialog){}
    constructor(
      public dialogRef: MatDialogRef<DialogsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogI,
    ) {}
}
