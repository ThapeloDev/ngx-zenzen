import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MediaMatcher } from '@angular/cdk/layout';
import { config } from '../app.config';

import { Subscription } from 'rxjs/internal/Subscription';
import { MatSidenav } from '@angular/material/sidenav';
import { actionSettingsChangeTheme } from '../shared/settings/settings.actions';
import { Observable } from 'rxjs';
import { selectTheme } from '../shared/settings/settings.selectors';
import { async } from 'rxjs/internal/scheduler/async';

export interface MediaQueryInterface {
  sm?: MediaQueryList;
  md?: MediaQueryList;
  lg?: MediaQueryList;
  xl?: MediaQueryList;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  media: MediaQueryInterface;
  menus: any[] = [
    { title: 'Dashboard', link: '/app/dashboard', icon: 'box' },
    { title: 'Stats', link: '/app/stats', icon: 'chart-bar' },
    { title: 'Contacts', link: '/app/contacts', icon: 'address-card' }
  ];
  user: any[] = [
    { title: 'User', icon: 'user' }
  ];
  theme$: Observable<string>;
  theme: string;

  private _mobileQueryListener: () => void;

  private subscription: Subscription;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private store: Store) {
    this.media = {
      sm: media.matchMedia(`(min-width: ${config.breakpoints.sm.min})`)
    };
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.media.sm.addListener((ev: MediaQueryListEvent) => {
      if (ev.matches) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
      this._mobileQueryListener;
    });
  }

  changeTheme() {
    this.store.dispatch(actionSettingsChangeTheme({ 'theme': this.theme === 'dark-theme' ? 'default-theme' : 'dark-theme' }));
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.subscription = this.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    this.media.sm.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }
}
