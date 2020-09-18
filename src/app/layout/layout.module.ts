import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { AgencyComponent } from '../pages/agency/agency.component';
import { BusComponent } from '../pages/bus/bus.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../pages/profile/profile.component';
import { TripComponent } from '../pages/trip/trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule  } from '@progress/kendo-angular-grid';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploadModule } from '@progress/kendo-angular-upload';

@NgModule({
  declarations: [
    LayoutComponent,
    AgencyComponent,
    BusComponent,
    DashboardComponent,
    ProfileComponent,
    TripComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    DropDownsModule,
    UploadModule,
    FormsModule,
    RouterModule,
    LayoutRoutingModule,
    
  ],

})
export class LayoutModule { }