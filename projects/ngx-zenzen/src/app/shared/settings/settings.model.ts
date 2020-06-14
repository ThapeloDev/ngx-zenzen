import { AppState } from '../shared.state';

export type Language = 'en' | 'de';
export type Theme = 'default-theme' | 'dark-theme';

export interface SettingsState {
  language: string;
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
