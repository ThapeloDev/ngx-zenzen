import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectTheme } from './shared/settings/settings.selectors';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme$: Observable<string>;

  constructor(private store: Store, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.theme$.subscribe((theme) => {
      const classList = document.querySelector('body').classList;
      const toRemove = Array.from(classList).filter((item: string) =>
        item.includes('-theme')
      );
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(theme);
    });
  }
}
