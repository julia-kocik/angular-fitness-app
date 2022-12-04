import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
          <p>You already got {{ data.progress }}%</p>
        </mat-dialog-content>
        <div mat-dialog-actions>
          <button mat-button [mat-dialog-close]="true">Ok</button>
          <button mat-button [mat-dialog-close]="false">Cancel</button>
        </div>
  `
})

export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
