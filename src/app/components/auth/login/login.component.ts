import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  form: FormGroup;
  submitted = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
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
    });
  }

  ngOnDestroy() {
    this.submitted = false;
    this.authStatusSub.unsubscribe();
  }

  get f() {
    return this.form.controls;
  }

  onLogin() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(
      this.form.value.email,
      this.form.value.password
    );
    this.submitted = false;
    this.form.reset();
  }

}
