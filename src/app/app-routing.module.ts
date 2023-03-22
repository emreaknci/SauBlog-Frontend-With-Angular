import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorForbiddenComponent } from './components/error-forbidden/error-forbidden.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

const routes: Routes = [{
  path: 'forbidden',
  component: ErrorForbiddenComponent
},
  {
    path: '**', pathMatch: 'full',
    component: ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
