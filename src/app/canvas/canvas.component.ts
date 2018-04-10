import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth';

import { CustomForm } from '../services/forms';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{

  @ViewChild('formwrap') wrap;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.auth.user_data){
      this.router.navigate(['/']);
      return null;
    }
    this.route.data.subscribe(data => {
      this.wrap.nativeElement.innerHTML = "";
      data.customForm.form_generator.render(this.wrap.nativeElement, data.customForm.data);
    });
  }

}
