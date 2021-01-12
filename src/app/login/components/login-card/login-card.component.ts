import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth/auth.service';
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
  public errorMessage: string = '';

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
      .subscribe(error => {
        this.errorMessage = error;
      });
  }

  public getErrorMessage(): string {
    if (this.loginForm.get('userName').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }
  }

  public onLogin(): void {
    const loginData = {
      username: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    }

    this._authService.login(loginData);
  }

  ngOnDestroy(): void {
    this._authService.errorMessage$.next('');
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
