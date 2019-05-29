import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Funko } from 'src/app/shared/model/funko.model';

@Component({
  selector: 'funko-card',
  templateUrl: './funko-card.component.html',
  styleUrls: ['./funko-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunkoCardComponent implements OnInit {
  @Input()
  funko: Funko;

  constructor() {}

  ngOnInit() {}
}
