import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule ,
    MatStepperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersModule { }
