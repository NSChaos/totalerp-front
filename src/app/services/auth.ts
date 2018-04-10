import { Injectable } from '@angular/core';
import {
  Resource, ResourceParams, ResourceAction,
  IResourceMethod, ResourceRequestMethod, ResourceHandler
} from '@ngx-resource/core';

import { AuthData, UserData } from '../data/auth';

@Injectable()
@ResourceParams({
  url: 'http://185.249.255.34/api/',
  removeTrailingSlash: false,
  withCredentials: true
})
export class AuthResource extends Resource {

  @ResourceAction({
    path: 'signin/',
    method: ResourceRequestMethod.Post
  })
  signin: IResourceMethod<AuthData, UserData>;

  @ResourceAction({
    path: 'signout/',
    withCredentials: true
  })
  signout: IResourceMethod<void, void>;

  @ResourceAction({
    path: 'profile/',
    withCredentials: true
  })
  get_profile: IResourceMethod<void, UserData>;

  constructor(handler: ResourceHandler) {
    super(handler);
  }

}

@Injectable()
export class AuthService {

  user_data: UserData = null;
  error = {};

  constructor(private auth: AuthResource) {}

  async signin(data: AuthData): Promise<void> {
    this.user_data = await this.auth.signin(data);
  }

  async signout(): Promise<void> {
    await this.auth.signout();
    this.user_data = null;
  }

  async get_profile(): Promise<void> {
    this.user_data = await this.auth.get_profile();
  }

}
