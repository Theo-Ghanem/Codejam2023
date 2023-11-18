import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { TestsComponent } from './pages/tests/tests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginComponent,
    SidebarComponent,
    MeetingsComponent,
    AssignmentsComponent,
    TestsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
