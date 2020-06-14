import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  constructor(private fb: FormBuilder) { }

  onRegister() {
    if (this.register.valid) {
      console.log(this.register.value);
    }
  }

  ngOnInit(): void {
    this.register = this.fb.group({
      first_name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      last_name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]),
      password_confirm: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]),
      terms: this.fb.control(false, [
        Validators.requiredTrue
      ])
    }, {
      validators: this.passwordConfirmMatchValidator
    });

    this.register.valueChanges.subscribe((res) => {
      console.log(this.register.get('password'));
    })
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
