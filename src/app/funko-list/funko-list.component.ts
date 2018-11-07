import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Funko } from '../app.component';
import { FunkoDetailComponent } from './funko-detail/funko-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'funko-list',
  templateUrl: './funko-list.component.html',
  styleUrls: ['./funko-list.component.scss']
})
export class FunkoListComponent implements OnInit {
  @Input()
  funkoFilter: Funko[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDetail(funko: Funko) {
    const dialogRef = this.dialog.open(FunkoDetailComponent, {
      width: '500px',
      data: funko
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
