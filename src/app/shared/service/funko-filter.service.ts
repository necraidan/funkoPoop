import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funko } from './../../app.component';

@Injectable({
  providedIn: 'root'
})
export class FunkoFilterService {
  funkoFilter: BehaviorSubject<Funko[]> = new BehaviorSubject<Funko[]>([]);
  constructor() {}
}
