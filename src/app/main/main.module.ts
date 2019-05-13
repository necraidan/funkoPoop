import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FunkoCardComponent } from './funko-card/funko-card.component';

@NgModule({
  declarations: [FunkoCardComponent],
  imports: [SharedModule],
  exports: [FunkoCardComponent]
})
export class MainModule {}
