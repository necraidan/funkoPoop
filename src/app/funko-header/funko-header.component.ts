import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FunkoStoreService } from '../shared/service/funko-store.service';

@Component({
  selector: 'funko-header',
  templateUrl: './funko-header.component.html',
  styleUrls: ['./funko-header.component.scss']
})
export class FunkoHeaderComponent implements OnInit {
  @Output()
  barcodeAsked = new EventEmitter<any>();

  barcodeOpen = false;

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

  openCamera() {
    console.log('call');
    this.barcodeOpen = !this.barcodeOpen;
    this.barcodeAsked.emit(this.barcodeOpen);
  }
}
