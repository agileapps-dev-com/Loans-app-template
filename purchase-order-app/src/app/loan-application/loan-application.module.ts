import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanApplicationRoutingModule } from './loan-application-routing.module';
import { LoanApplicationComponent } from './loan-application.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoanApplicationComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoanApplicationRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoanApplicationModule { }
