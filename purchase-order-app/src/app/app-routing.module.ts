import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }, { path: 'loan-application', loadChildren: () => import('./loan-application/loan-application.module').then(m => m.LoanApplicationModule) }, { path: '', redirectTo: "loan-application", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
