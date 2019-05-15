import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Funko } from './shared/model/funko.model';
import { FunkoStoreService } from './shared/service/funko-store.service';

@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funkoList: Funko[] = [];

  constructor(private funkoStore: FunkoStoreService) {}

  ngOnInit(): void {
    this.funkoStore.initFunkoStore();

    this.funkoStore.funkoList.subscribe(fl => {
      this.funkoList = fl;
    });
  }
}
