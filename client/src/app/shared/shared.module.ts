import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkedPipe } from './marked.pipe';
import { HilightPipe } from './hilight.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';



@NgModule({
  declarations: [
    MarkedPipe,
    HilightPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MarkedPipe,
    HilightPipe,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
