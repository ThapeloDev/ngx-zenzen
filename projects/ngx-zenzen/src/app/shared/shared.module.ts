import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * Material modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from './notifications/notification.service';

const MaterialModule = [
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatMenuModule,
];

/*
 * Other modules
 */
import { LocalStorageService } from './local-storage/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FontAwesomeModule,

    /* Material modules */
    MaterialModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    /* Material modules */
    MaterialModule,
  ],
  providers: [LocalStorageService, NotificationService]
})
export class SharedModule { }