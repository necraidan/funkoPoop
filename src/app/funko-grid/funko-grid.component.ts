import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Funko } from '../app.component';
import { FunkoFilterService } from './../shared/service/funko-filter.service';
import { FunkoDetailComponent } from './funko-detail/funko-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'funko-grid',
  templateUrl: './funko-grid.component.html',
  styleUrls: ['./funko-grid.component.scss']
})
export class FunkoGridComponent implements OnInit {
  funkoFilterList: Funko[];

  constructor(private dialog: MatDialog, private funkoFilterService: FunkoFilterService) {}

  ngOnInit() {
    this.funkoFilterService.funkoFilter.subscribe(list => {
      this.funkoFilterList = list;
    });
  }

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
