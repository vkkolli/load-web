import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  // @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor() {
  }

  ngOnInit(): void {
  }

  showMenu() {
    // this.sideMenu.toggle();
  }

}
