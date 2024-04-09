import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { StadisticComponent } from './pages/dashboard/stadistic/stadistic.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { NavbarComponent } from './pages/dashboard/navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Libreria de full calendar
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    DialogsComponent,
    NotificationsComponent,
    StadisticComponent,
    SidebarComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
