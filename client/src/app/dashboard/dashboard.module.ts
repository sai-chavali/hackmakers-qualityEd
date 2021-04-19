import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoursesTakenComponent } from '../courses-taken/courses-taken.component';
import { CourseSuggestionsComponent } from '../course-suggestions/course-suggestions.component';
import { StatsComponent } from '../stats/stats.component';
import {MatCardModule} from '@angular/material/card';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { GravatorComponent } from '../gravator/gravator.component';
import { MaterialComponentsModule } from '../material-components.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesTakenComponent,
    CourseSuggestionsComponent,
    StatsComponent,
    LeaderboardComponent,
    UserInfoComponent,
    GravatorComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    DashboardRoutingModule,
    MaterialComponentsModule,
    RouterModule,
    SharedModule
  ]
})
export class DashboardModule { }
