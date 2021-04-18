import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

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

  update(v: MatButtonToggleChange) {
    this.status = v.value;
  }

}
