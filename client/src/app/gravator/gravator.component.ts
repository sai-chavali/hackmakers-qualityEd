import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gravator',
  templateUrl: './gravator.component.html',
  styleUrls: ['./gravator.component.scss']
})
export class GravatorComponent implements OnInit {

  @Input() value: number;
  @Input() image: string;
  @Input() description: string;
  @Input() position: string;
  constructor() { }

  ngOnInit(): void {
  }

}
