import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Funko } from 'src/app/shared/model/funko.model';

declare var VanillaTilt: any;

@Component({
  selector: 'funko-card',
  templateUrl: './funko-card.component.html',
  styleUrls: ['./funko-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunkoCardComponent implements OnInit {
  @Input()
  funko: Funko;

  constructor(private El: ElementRef, private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    if (this.deviceService.isDesktop()) {
      VanillaTilt.init(this.El.nativeElement, {
        scale: 1.1
      });
    }
  }
}
