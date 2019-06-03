import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { Funko } from './shared/model/funko.model';
import { FunkoStoreService } from './shared/service/funko-store.service';

@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav;

  isMain = true;
  funkoList: Funko[] = [];
  owned: number;

  constructor(private funkoStore: FunkoStoreService, private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.funkoStore.initFunkoStore();

    this.funkoStore.funkoList.subscribe(fl => {
      this.funkoList = fl;
      if (!this.owned) {
        this.owned = fl.filter(f => f.owned).length;
      }
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  toggleMenuHandler() {
    this.sidenav.toggle();
  }

  barcodeHandler() {
    this.isMain = !this.isMain;
    this.sidenav.close();
  }

  trackElement(index: number, funko: Funko) {
    return funko.guid;
  }
}
