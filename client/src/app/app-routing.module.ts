import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './learning/page/page.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path:'', component: HomeComponent},
  {path: 'lesson/:pageid', component:PageComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
