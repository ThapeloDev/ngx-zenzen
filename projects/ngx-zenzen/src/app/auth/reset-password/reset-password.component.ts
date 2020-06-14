import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  reset: FormGroup;
  token: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private notificationsService: NotificationService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onReset() {
    if (this.reset.valid) {
      console.log(this.reset.value);
    }
  }

  ngOnInit(): void {
    this.reset = this.fb.group({
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]),
      password_confirm: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    }, {
      validators: this.passwordConfirmMatchValidator
    });

    if (!this.token) {
      this.notificationsService.show('No token', {
        duration: 5000
      })
    }
    console.log(this.token);
  }

  passwordConfirmMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const password_confirm = g.get('password_confirm');

    if (password_confirm.hasError('required') || password_confirm.hasError('minlength')) return;
    if (password.value !== password_confirm.value) {
      password_confirm.setErrors({
        mismatch: true
      });
    } else {
      password_confirm.setErrors(null);
    }
  }
}
