import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Funko } from './shared/model/funko.model';
import { FunkoStoreService } from './shared/service/funko-store.service';

@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMain = true;
  funkoList: Funko[] = [];

  constructor(private funkoStore: FunkoStoreService, private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.funkoStore.initFunkoStore();

    this.funkoStore.funkoList.subscribe(fl => {
      this.funkoList = fl;
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  barcodeHandler(event: any) {
    this.isMain = !event;
  }
}
