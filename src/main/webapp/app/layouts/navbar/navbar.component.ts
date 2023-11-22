import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VERSION } from 'app/app.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  isOpenMenu = false;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  toggleDropDown(): void {
    const ul = document.querySelector('.nav-item.dropdown ul') as HTMLElement;

    const displayValue = ul.style.display;
    if (displayValue === 'block') {
      ul.style.display = 'none';
    } else {
      ul.style.display = 'block';
    }
  }

  toggleDropDownProfile(): void {
    const ul = document.querySelector('.nav-item-profile.dropdown ul') as HTMLElement;

    const displayValue = ul.style.display;
    if (displayValue === 'block') {
      ul.style.display = 'none';
    } else {
      ul.style.display = 'block';
    }
  }

  toggleDropDownStamp(): void {
    const ul = document.querySelector('.nav-item-stamp.dropdown ul') as HTMLElement;

    const displayValue = ul.style.display;
    if (displayValue === 'block') {
      ul.style.display = 'none';
    } else {
      ul.style.display = 'block';
    }
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
