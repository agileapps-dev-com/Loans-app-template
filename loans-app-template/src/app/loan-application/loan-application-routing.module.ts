import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanApplicationComponent } from './loan-application.component';

const routes: Routes = [
  { path: 'apply', component: LoanApplicationComponent },
  { path: '', redirectTo: "apply", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule { }
