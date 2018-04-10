import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './services/auth';

import { AuthData, UserData } from './data/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  auth: AuthService;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.auth = this.authService;
    this.auth.get_profile().then(() => {},
    error => {
      console.log(error);
    });
  }

  logout() {
    this.auth.signout().then(() => {},
    error => {
      console.log(error);
    });
  }

}
