import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Funko } from './shared/model/funko.model';

@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funkoList: Funko[];
  funkoStore: Funko[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/funko.json').subscribe((res: Funko[]) => {
      this.funkoStore = res;
      this.funkoList = [...this.funkoStore];
    });
  }
}
