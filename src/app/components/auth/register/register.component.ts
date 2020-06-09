import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService) { }

  get f() {
    return this.form.controls;
  }

  isLoading = true;
  form: FormGroup;
  submitted = false;
  private authStatusSub: Subscription;

  public passwordValidator  = (group: FormGroup) => {

    const password = group.value.password;
    const confirmPassword = group.value.confirmPassword;

    if ( password !== confirmPassword) {
      return { differents: true };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      }),
    }, { validators: this.passwordValidator });
  }

  ngOnDestroy() {
    this.submitted = false;
    this.authStatusSub.unsubscribe();
  }

  onRegister() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.register(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.password,
    );
    this.submitted = false;
    this.form.reset();
  }

}
