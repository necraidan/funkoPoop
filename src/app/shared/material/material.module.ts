// import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class MaterialModule {}
