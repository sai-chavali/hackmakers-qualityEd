import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Page } from 'src/app/services/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() name!: string;
  public page$!: Observable<Page>;
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.page$ = this.dataService.getPage(this.name);
  }

}
