import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-markdown-action',
  templateUrl: './markdown-action.component.html',
  styleUrls: ['./markdown-action.component.scss']
})
export class MarkdownActionDialog {

  /*
  Data format : {markdown: '', actions: [{name: '', ...}, ...]}
   */
  constructor(
    public dialogRef: MatDialogRef<MarkdownActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  click(action: any): void {
    this.dialogRef.close(action);
  }

}
