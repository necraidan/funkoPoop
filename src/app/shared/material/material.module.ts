import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatCardModule, MatButtonModule],
  exports: [MatToolbarModule, MatCardModule, MatButtonModule]
})
export class MaterialModule {}
