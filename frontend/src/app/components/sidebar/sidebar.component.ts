import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ApiService} from "../../services/api.service";

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
    subRoutes: []
  },
  { 
    path: '/assignments', 
    title: 'Assignments',  
    icon:'library_books', 
    class: '', 
    subRoutes: []
  },
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'Settings',  icon:'settings', class: 'active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  activeRoute: string = '';

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveRoute(event.urlAfterRedirects);
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES
    this.setSubRoutes('tests');
    this.setSubRoutes('assignments');
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

  setSubRoutes(route: string) {
        let index = this.menuItems.findIndex(item => item.path === '/' + route);
        let testSubRoutes = [];
        this.apiService.getItems(null).then(data => {
            testSubRoutes = data.filter(t => t.type === route);
        });
        this.menuItems[index].subRoutes = testSubRoutes.map(item => {
            return {path: `/${route}/${item.id}`, title: item.name, icon: 'quiz', class: ''}
        })
    }
}
