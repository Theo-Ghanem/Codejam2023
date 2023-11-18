import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    subRoutes?: RouteInfo[]; 
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/tests', title: 'Tests',  icon:'library_books', class: '' },
    { 
      path: '/tests', 
      title: 'Tests',  
      icon:'library_books', 
      class: '', 
      subRoutes: [ // Add this block
          { path: '/tests/1', title: 'Test 1', icon: 'content_paste', class: '' },
          { path: '/tests/2', title: 'Test 2', icon: 'content_paste', class: '' },
          // Add more subroutes as needed
      ] 
  },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Meeting Booking',  icon:'content_paste', class: '' },
    { path: '/table-list', title: 'Assignment Planning',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
