import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {TestComponent} from 'app/tests/test/test.component';
import {TestsComponent} from 'app/tests/tests.component';
import {AssignmentComponent} from 'app/assignments/assignment/assignment.component';
import {ProfileComponent} from "../../profile/profile.component";
import {AssignmentsComponent} from "../../assignments/assignments.component";

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
    {path: 'tests', component: TestsComponent},
    {path: 'tests/:id', component: TestComponent},
    {path: 'assignments', component: AssignmentsComponent},
    {path: 'assignments/:id', component: AssignmentComponent},
    {path: 'profile', component: ProfileComponent}
];
