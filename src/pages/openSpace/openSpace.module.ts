import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OpenSpacePage } from './openSpace';

@NgModule({
  declarations: [
    OpenSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenSpacePage),
  ],
  exports: [
    OpenSpacePage
  ]
})
export class OpenSpacePageModule { }