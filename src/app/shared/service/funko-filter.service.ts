import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funko } from './../../app.component';

@Injectable({
  providedIn: 'root'
})
export class FunkoFilterService {
  funkoFiler$: BehaviorSubject<Funko[]> = new BehaviorSubject<Funko[]>([]);
  constructor() {}
}
