import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/common/models/user';
import { AuthService, TOCKEN } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerTitle: string = 'Contacts Book';
  public user: UserI;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TOCKEN)).user;
  }

  public logout(): void {
    this._authService.logout();
  }
}
