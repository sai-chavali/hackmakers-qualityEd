import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoursesTakenComponent } from '../courses-taken/courses-taken.component';
import { CourseSuggestionsComponent } from '../course-suggestions/course-suggestions.component';
import { StatsComponent } from '../stats/stats.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { UserInfoComponent } from '../user-info/user-info.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesTakenComponent,
    CourseSuggestionsComponent,
    StatsComponent,
    LeaderboardComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
