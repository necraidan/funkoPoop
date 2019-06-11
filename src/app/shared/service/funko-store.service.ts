import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funko } from '../model/funko.model';

@Injectable({
  providedIn: 'root'
})
export class FunkoStoreService {
  private funkoSub: BehaviorSubject<Funko[]> = new BehaviorSubject<Funko[]>([]);
  private querySub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private funkoJson: Funko[];
  readonly funkoList = this.funkoSub.asObservable();
  readonly query = this.querySub.asObservable();

  queryWorker: Worker = new Worker('../../app.worker', { type: 'module' });

  constructor(private http: HttpClient) {
    this.queryWorker.onmessage = ({ data }) => {
      this.funkoSub.next(data);
    };
  }

  initFunkoStore() {
    this.filterFunkoList('');
  }

  resetFunkoList() {
    this.funkoSub.next([...this.funkoJson]);
  }

  filterFunkoList(filter: string) {
    this.queryWorker.postMessage(filter);
  }

  setQuery(query: string) {
    this.querySub.next(query);
  }
}
