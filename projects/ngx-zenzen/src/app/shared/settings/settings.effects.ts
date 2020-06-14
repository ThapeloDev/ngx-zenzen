import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { selectSettingsState } from '../shared.state';
import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  actionSettingsChangeLanguage,
  actionSettingsChangeTheme,
} from './settings.actions';
import { State } from './settings.model';
import { selectTheme } from './settings.selectors';
import { OverlayContainer } from '@angular/cdk/overlay';

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService
  ) {
  }

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsChangeLanguage,
          actionSettingsChangeTheme
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );
}
