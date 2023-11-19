import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    subRoutes?: RouteInfo[]; 
    isExpanded?: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/profile', title: 'User Profile',  icon:'person', class: '' },
  { 
    path: '/tests', 
    title: 'Tests',  
    icon:'quiz', 
    class: '', 
    subRoutes: [
        { path: '/tests/1', title: 'Test 1', icon: 'quiz', class: '' },
        { path: '/tests/2', title: 'Test 2', icon: 'quiz', class: '' },
        // Add more subroutes as needed
    ] 
  },
  { 
    path: '/assignments', 
    title: 'Assignments',  
    icon:'library_books', 
    class: '', 
    subRoutes: [
        { path: '/assignments/1', title: 'Assignment 1', icon: 'content_paste', class: '' },
        { path: '/assignments/2', title: 'Assignment 2', icon: 'content_paste', class: '' },
        // Add more subroutes as needed
    ] 
  },
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  { path: '/user-profile', title: 'Settings',  icon:'settings', class: 'active-pro' }
  // Add more routes as needed
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  activeRoute: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveRoute(event.urlAfterRedirects);
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  setActiveRoute(route: string): void {
    const currentRoute = this.router.url;
    this.activeRoute = route;
  }

  navigateAndToggle(route) {
    // Close all other routes
    this.menuItems.forEach(item => {
      if (item !== route) {
        item.isExpanded = false;
      }
    });
  
    // Toggle the clicked route
    route.isExpanded = !route.isExpanded;
  }

  isActive(routePath: string): boolean {
    // Check if the current route is active
    return this.router.url.includes(routePath);
  }
}
