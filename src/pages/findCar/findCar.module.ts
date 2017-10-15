import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FindCar } from './findCar';

@NgModule({
  declarations: [
    FindCar,
  ],
  imports: [
    IonicPageModule.forChild(FindCar),
  ],
  exports: [
    FindCar
  ]
})
export class FindCarModule { }