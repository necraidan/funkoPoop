import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatInputModule,
    MatCardModule,
    MatDialogModule
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FunkoDetailComponent } from './funko-detail/funko-detail.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterFunkoPipe } from './shared/pipe/filter-funko-pipe.component';

@NgModule({
    declarations: [AppComponent, MainNavComponent, FunkoDetailComponent, FilterFunkoPipe],
    imports: [
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
        ReactiveFormsModule
    ],
    entryComponents: [FunkoDetailComponent],
    providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
    bootstrap: [AppComponent]
})
export class AppModule {}
