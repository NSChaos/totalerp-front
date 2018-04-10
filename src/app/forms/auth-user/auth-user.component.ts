import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { AuthData } from '../../data/auth';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent {
  hide: boolean = true;
  error: string = '';
  login = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  model: AuthData = new AuthData;

  getLoginError() {
    return this.login.hasError('required') ? 'You must enter a value' :
      this.login.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  constructor(
    private auth: AuthService,
  ) {}

  signin() {
    this.auth.signin(this.model).then(() => {},
    error => {
      this.error = error.body.message;
      console.log(error);
    });

    //this.authData = this.auth.login(this.model);
    //this.model = new UserData(this.model.email, '', navigator.language);
    //this.communicateService.sendMessage(this.authData);
  }

}
