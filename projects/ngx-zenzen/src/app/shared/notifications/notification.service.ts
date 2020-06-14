import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) { }

  public show(message: string, configuration: MatSnackBarConfig) {
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  }
}
