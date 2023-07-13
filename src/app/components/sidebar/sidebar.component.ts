import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Accueil',  icon: 'dashboard', class: '' },
    { path: '/bus', title: 'Bus',  icon:'directions_bus', class: '' },
    { path: '/chauffeurs', title: 'Chauffeurs',  icon:'people', class: '' },
    { path: '/stations', title: 'Stations',  icon:'location_on', class: '' },
    { path: '/agences', title: 'Agences',  icon:'business', class: '' },
    { path: '/table-list', title: 'Elèves',  icon:'school', class: '' },
    { path: '/personnels', title: 'Personnels',  icon:'person', class: '' },
    { path: '/classes', title: 'Classes',  icon:'class', class: '' },
    { path: '/annee-scolaire', title: 'Années Scolaires',  icon:'date_range', class: '' },
    { path: '/affectation-eleve', title: 'Affectation Elève',  icon:'assignment_ind', class: '' },
    { path: '/affectation-personnel', title: 'Affectation Personnel',  icon:'assignment', class: '' },
    { path: '/lignes', title: 'Lignes',  icon:'directions', class: '' },
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
