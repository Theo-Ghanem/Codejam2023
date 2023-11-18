import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {MeetingsComponent} from "./pages/meetings/meetings.component";
import {TestsComponent} from "./pages/tests/tests.component";
import {AssignmentsComponent} from "./pages/assignments/assignments.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'meetings',
    component: MeetingsComponent,
    children: [
      {
        path: 'meeting/:id',
        loadComponent: () => import('./pages/meetings/meeting/meeting.component').then(m => m.MeetingComponent)
      }
    ]
  },
  {
    path: 'tests',
    component: TestsComponent,
    children: [
      {
        path: 'test/:id',
        loadComponent: () => import('./pages/tests/test/test.component').then(m => m.TestComponent)
      }
    ]
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    children: [
      {
        path: 'assignment/:id',
        loadComponent: () => import('./pages/assignments/assignment/assignment.component').then(m => m.AssignmentComponent)
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
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
