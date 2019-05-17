import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exclusivity } from '../model/exclusivity.enum';
import { Funko } from '../model/funko.model';
import { Rarity } from '../model/rarity.enum';

@Injectable({
  providedIn: 'root'
})
export class FunkoStoreService {
  private funkoSub: BehaviorSubject<Funko[]> = new BehaviorSubject<Funko[]>([]);
  private querySub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private funkoJson: Funko[];
  readonly funkoList = this.funkoSub.asObservable();
  readonly query = this.querySub.asObservable();

  constructor(private http: HttpClient) {}

  initFunkoStore() {
    this.http.get('assets/funko.json').subscribe((res: Funko[]) => {
      this.funkoJson = res;
      this.funkoSub.next([...res]);
    });
  }

  resetFunkoList() {
    this.funkoSub.next([...this.funkoJson]);
  }

  filterFunkoList(filter: string) {
    this.funkoSub.next(
      this.funkoJson.filter((funko: Funko) => {
        return (
          funko.name.toLowerCase().includes(filter) ||
          funko.category.toLowerCase().includes(filter) ||
          funko.collection.toLowerCase().includes(filter) ||
          funko.number.toLowerCase().includes(filter) ||
          (funko.tags && funko.tags.length && funko.tags.includes(filter)) ||
          (funko.rarities && funko.rarities.length && funko.rarities.includes(filter as Rarity)) ||
          (funko.exclusivities && funko.exclusivities.length && funko.exclusivities.includes(filter as Exclusivity)) ||
          (funko.barcode && funko.barcode.includes(filter))
        );
      })
    );
  }

  setQuery(query: string) {
    this.querySub.next(query);
  }
}
