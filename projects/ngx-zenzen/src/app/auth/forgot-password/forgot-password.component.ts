import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup;

  constructor(private fb: FormBuilder) { }

  onForgot() {
    if (this.forgot.valid) {
      console.log(this.forgot.value);
    }
  }

  ngOnInit(): void {
    this.forgot = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ])
    });
  }

}
