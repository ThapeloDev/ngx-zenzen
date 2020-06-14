import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/*
 * Font awesome module
 */
import {
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faEllipsisV,
  faBars,
  faBox,
  faChartBar,
  faAddressCard,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/* 
* NGRX
*/
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './shared/shared.state';
import { SettingsEffects } from './shared/settings/settings.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),

    /* NGRX */
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      SettingsEffects,
    ])

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faEye,
      faEyeSlash,
      faGithub,
      faEllipsisV,
      faBars,
      faBox,
      faChartBar,
      faAddressCard,
      faUser,
      faCog,
      faSignOutAlt
    );
  }
}
