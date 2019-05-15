import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Funko } from '../shared/model/funko.model';
import { FunkoStoreService } from '../shared/service/funko-store.service';

@Component({
  selector: 'funko-header',
  templateUrl: './funko-header.component.html',
  styleUrls: ['./funko-header.component.scss']
})
export class FunkoHeaderComponent implements OnInit {
  searchForm = new FormGroup({
    query: new FormControl(''),
    radioModel: new FormControl('all'),
    categorieModel: new FormControl('All'),
    collectionModel: new FormControl('All')
  });

  isQuery: boolean;

  constructor(private funkoStore: FunkoStoreService) {}

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(values => {
      this.isQuery = !!values.query;
      // this.pushState(values);

      setTimeout(() => {
        this.funkoStore.filterFunkoList(this.searchForm.get('query').value.toLowerCase());
      }, 0);
    });
  }

  clearInput() {
    this.searchForm.patchValue({ query: '' });
  }
}
