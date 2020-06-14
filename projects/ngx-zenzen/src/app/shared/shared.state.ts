import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  INIT,
  UPDATE
} from '@ngrx/store';

import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';
import { LocalStorageService } from './local-storage/local-storage.service';

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer
};

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export interface AppState {
  settings: SettingsState;
}

export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}