import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { SideNavService } from '../../side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  // @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;

  @Input() headerText: String;
  public isCollapsed = true;

  constructor(){

  }

  ngOnInit(): void {
  }

  sideMenuToggle() {
    // this.sideNavService.toggle();
  }

}
