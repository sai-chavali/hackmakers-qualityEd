import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { Page } from 'src/app/services/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  name!: string;
  public page$!: Observable<Page>;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.name = params['pageid'];
      this.page$ = this.dataService.getPage(this.name);
    });
  }

}
