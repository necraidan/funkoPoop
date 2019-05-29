import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild('inputQuery', { read: ElementRef, static: true })
  inputQuery: ElementRef;

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
      const query = this.searchForm.get('query').value.toLowerCase();
      this.isQuery = !!values.query;

      setTimeout(() => {
        this.funkoStore.filterFunkoList(query);
      }, 0);
    });

    this.funkoStore.query.subscribe(query => {
      if (query !== this.searchForm.get('query').value) {
        this.searchForm.patchValue({ query });
      }
    });

    this.funkoStore.funkoList.subscribe(() => {
      if (this.barcodeOpen) {
        this.openCloseCamera();
      }
    });
  }

  handleEnter(event: KeyboardEvent) {
    (this.inputQuery.nativeElement as HTMLInputElement).blur();
    event.stopPropagation();
  }

  clearInput(event: MouseEvent) {
    if (event.pageX !== 0 || event.pageY !== 0) {
      this.searchForm.patchValue({ query: '' });
    }
  }

  openCloseCamera() {
    this.barcodeOpen = !this.barcodeOpen;
    this.barcodeAsked.emit(this.barcodeOpen);
  }
}
