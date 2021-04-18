import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/services/page';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit  {
  @Input() content!: Content;
  
  selectedindex = 0;
  //progressinterval: any;

  constructor() { }

  ngOnInit(): void {

  }


}
