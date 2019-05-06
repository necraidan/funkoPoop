import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funko } from '../model/funko.model';

@Injectable({
  providedIn: 'root'
})
export class FunkoFilterService {
  funkoFilter: BehaviorSubject<Funko[]> = new BehaviorSubject<Funko[]>([]);
  constructor() {}
}
