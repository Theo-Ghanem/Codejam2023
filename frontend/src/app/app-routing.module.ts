import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {MeetingsComponent} from "./pages/meetings/meetings.component";
import {TestsComponent} from "./pages/tests/tests.component";
import {AssignmentsComponent} from "./pages/assignments/assignments.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'meetings',
    component: MeetingsComponent
  },
  {
    path: 'tests',
    component: TestsComponent
  },
  {
    path: 'assignments',
    component: AssignmentsComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
