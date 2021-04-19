import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkedPipe } from './marked.pipe';
import { HilightPipe } from './hilight.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MaterialComponentsModule } from '../material-components.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownInputComponent } from './markdown-input/markdown-input.component';



@NgModule({
  declarations: [
    MarkedPipe,
    HilightPipe,
    SafeHtmlPipe,
    MarkdownInputComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    MarkedPipe,
    HilightPipe,
    SafeHtmlPipe,
    MarkdownInputComponent
  ]
})
export class SharedModule { }
