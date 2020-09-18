import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component'
import { BusComponent } from '../pages/bus/bus.component';
import { AgencyComponent } from '../pages/agency/agency.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../pages/profile/profile.component';
import { TripComponent } from '../pages/trip/trip.component';

const routes: Routes = [
  {path:"dashboard",redirectTo:"index",pathMatch:"full"},
  {path:"home",redirectTo:"index",pathMatch:"full"},
  { path: 'index', component: DashboardComponent},
  {path:'bus',component:BusComponent},
  {path:'agency',component:AgencyComponent},
  {path:'profile',component:ProfileComponent},
  {path:'trip',component:TripComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}