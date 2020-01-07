import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FunkoCodeReaderComponent } from './funko-code-reader/funko-code-reader.component';
import { FunkoHeaderComponent } from './funko-header/funko-header.component';
import { FunkoRoutingModule } from './funko-routing.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, FunkoHeaderComponent, FunkoCodeReaderComponent],
  imports: [
    FunkoRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MainModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
  bootstrap: [AppComponent]
})
export class AppModule {}
