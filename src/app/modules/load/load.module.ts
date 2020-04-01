import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadRoutingModule } from './load-routing.module';
import { LoadComponent } from './container/load.component';


@NgModule({
  declarations: [LoadComponent],
  imports: [
    CommonModule,
    LoadRoutingModule
  ]
})
export class LoadModule { }
