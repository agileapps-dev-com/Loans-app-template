import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'loans', loadChildren: () => import('./loan-application/loan-application.module').then(m => m.LoanApplicationModule) },
  { path: '', redirectTo: "loans", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }