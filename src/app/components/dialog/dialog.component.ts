import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}} </h1>
    <div mat-dialog-content>
        {{data.content}}
    </div>
    <div mat-dialog-actions>
        <button mat-button mat-dialog-close (click)="onNoClick()">Hayır</button>
        <button mat-button mat-primary (click)="onYesClick()" cdkFocusInitial>Evet</button>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title: string;
  content: string;
  width: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    const {
      title,
      content,
    } = this.data;
    this.title = title;
    this.content = content;
  }

  onNoClick(): void {
    this.dialogRef.close();
    if (this.data.callback) {
      this.data.callback(false);
    }
  }
  onYesClick(): void {
    this.dialogRef.close();
    if (this.data.callback) {
      this.data.callback(true);
    }
  }

}

export interface DialogData {
  title: string;
  content: string;
  callback?: (result: boolean) => void;
}

