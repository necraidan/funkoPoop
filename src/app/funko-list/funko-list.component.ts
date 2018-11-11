import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { FunkoFilterService } from '../shared/service/funko-filter.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'funko-list',
  templateUrl: './funko-list.component.html',
  styleUrls: ['./funko-list.component.scss']
})
export class FunkoListComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'category', 'collection', 'popCategory'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private funkoFilterService: FunkoFilterService) {}

  ngOnInit() {
    this.funkoFilterService.funkoFiler$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
    });
  }
}
