import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateModel } from '../shared/model/authentication.model';
import { AuthService } from '../shared/service/auth.service';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { loginAnimations } from './login.component.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: loginAnimations
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.min(8)
    ])
  });

  public isLoading = false;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _tokenStorageService: TokenStorageService
  ) { }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    this.isLoading = true;
    this.loginForm.pending;
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this._authService.login(val.email, val.password).subscribe((result: AuthenticateModel) => {
        console.log("User is logged in");
        this._tokenStorageService.store(result.Token);
        this.isLoading = false;
        this._router.navigateByUrl('home');
      }, (error) => {
        this.loginForm.setErrors({
          invalidLogin: true
        });
        this.isLoading = false;
      });
    } else {
      this.loginForm.setErrors({
        invalidLogin: true
      });
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
  }

}
