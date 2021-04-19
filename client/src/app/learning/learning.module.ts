import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialComponentsModule } from '../material-components.module';
import { PageComponent } from './page/page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RatingComponent } from './rating/rating.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ContentComponent,
    PageComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    PageComponent
  ]
})
export class LearningModule { }
