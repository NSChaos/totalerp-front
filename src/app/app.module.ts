import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthUserComponent } from './forms/auth-user/auth-user.component';
import { AuthResource, AuthService } from './services/auth';
import { FormService, FormResolver } from './services/forms';
import { Page404Component } from './page-404/page-404.component';
import { CanvasComponent } from './canvas/canvas.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'module/:id',
    component: CanvasComponent,
    resolve: {
      customForm: FormResolver
    }
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthUserComponent,
    Page404Component,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
       { enableTracing: false }
    ),
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
    ResourceModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    AuthResource,
    AuthService,
    FormService,
    FormResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
