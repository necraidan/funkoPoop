import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * Table de routage de l'application
 */
const routes: Routes = [{ path: '', pathMatch: 'full', component: AppComponent }, { path: 'search', component: AppComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FunkoRoutingModule {}
