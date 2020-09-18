import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  sendTo() {
    if (this.auth.getToken) {
      this.router.navigate(['/index']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
