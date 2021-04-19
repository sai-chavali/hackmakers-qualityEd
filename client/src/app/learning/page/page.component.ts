import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { Page } from 'src/app/services/page';
import { MarkdownActionDialog } from 'src/app/shared/markdown-action/markdown-action.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  name!: string;
  public page$!: Observable<Page>;
  constructor(private dataService: DataService, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.name = params['pageid'];
      this.page$ = this.dataService.getPage(this.name);
    });
  }

  showinfo() {
    let md: string = `
# Learn Your Way

The suggested content is suited to **your individual learning profile**.

You can go through each content and write your own understanding. 
You can share your understanding with the world or anyone to get feedback.

As you write, prepare video or podcasts, practice and as you get feedbacks you earn reward points that you can redeem towards subscription or special trainings. 

**If your contribution is novel** you will earn even more reward points.
    `;
    this.dialog.open(MarkdownActionDialog, {
      data: { markdown: md }
    });
  }

}
