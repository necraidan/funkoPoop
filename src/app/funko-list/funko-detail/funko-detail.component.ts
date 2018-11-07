import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'funko-detail',
  templateUrl: 'funko-detail.component.html',
  styleUrls: ['funko-detail.component.scss']
})
export class FunkoDetailComponent {
  constructor(public dialogRef: MatDialogRef<FunkoDetailComponent>, @Inject(MAT_DIALOG_DATA) public funko: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
