import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MAT_LABEL_GLOBAL_OPTIONS
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FunkoDetailComponent } from './funko-list/funko-detail/funko-detail.component';
import { FunkoListComponent } from './funko-list/funko-list.component';
import { FunkoRoutingModule } from './funko-routing.module';
import { HeaderComponent } from './header/header.component';
import { FilterFunkoPipe } from './shared/pipe/filter-funko-pipe.component';

@NgModule({
  declarations: [AppComponent, FunkoDetailComponent, FilterFunkoPipe, HeaderComponent, FunkoListComponent],
  imports: [
    FunkoRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatChipsModule
  ],
  entryComponents: [FunkoDetailComponent],
  providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
  bootstrap: [AppComponent]
})
export class AppModule {}
