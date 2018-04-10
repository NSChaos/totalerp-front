import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: AuthService;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

}
