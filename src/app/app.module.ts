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
    MatDialogModule,
    MatRadioModule
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterFunkoPipe } from './shared/pipe/filter-funko-pipe.component';
import { HeaderComponent } from './header/header.component';
import { FunkoListComponent } from './funko-list/funko-list.component';
import { FunkoDetailComponent } from './funko-list/funko-detail/funko-detail.component';

@NgModule({
    declarations: [AppComponent, MainNavComponent, FunkoDetailComponent, FilterFunkoPipe, HeaderComponent, FunkoListComponent],
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
        ReactiveFormsModule,
        MatRadioModule
    ],
    entryComponents: [FunkoDetailComponent],
    providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
    bootstrap: [AppComponent]
})
export class AppModule {}
