import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/constant/user';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User
  constructor(private router: Router, private auth: AuthService, private userService: UserService) {
    if (this.auth.getToken) {
      this.router.navigate(['/index']);
    }
    this.user = new User();
  }

  ngOnInit(): void {
  }
  loginPerform() {
    this.userService.login(this.user).subscribe((v) => {
        console.log(v);
        this.auth.sendToken(v);
        this.router.navigate(['/index']);
      },(err) => {alert('Wrong Email or Password')});
  }
}
