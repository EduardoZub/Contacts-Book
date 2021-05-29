import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, ErrorI } from 'src/app/common/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  private readonly unsubscribe$: Subject<void> = new Subject();

  public isDisabled: boolean = true;
  public errorMessage: ErrorI = null;

  public loginForm = this._formBuilder.group({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._authService.errorMessage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((errorMessage: ErrorI) => {
        this.errorMessage = errorMessage;
      });
  }

  public getErrorMessage(): string {
    const message = 'You must enter a value';
    if (this.loginForm.get('userName').hasError('required')) {
      return message;
    }

    if (this.loginForm.get('password').hasError('required')) {
      return message;
    }
  }

  public onLogin(): void {
    const loginData = {
      username: this.loginForm.get('userName').value.trim(),
      password: this.loginForm.get('password').value.trim()
    }

    this._authService.login(loginData);
  }

  ngOnDestroy(): void {
    this._authService.errorMessage$.next(null);
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
