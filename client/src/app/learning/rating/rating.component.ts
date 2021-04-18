import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() status!: string;

  constructor() { }

  ngOnInit(): void {
  }

  update(v: any) {
    //console.log(v);
  }

}
