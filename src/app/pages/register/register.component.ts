import { Component, OnInit } from '@angular/core';
import { User } from '../../constant/user'
import { Agency } from '../../constant/Agency'
import { UserService } from '../../services/User.service'
import { AgencyService } from '../../services/Agency.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User
  agency: Agency
  rePassword: string = "";
  constructor(private router: Router, private userService: UserService, private agencyService: AgencyService) {
    this.user = new User();
    this.agency = new Agency();
  }

  ngOnInit(): void {
  }
  registerAccount() {
    if (this.rePassword === this.user.password) {
      this.userService.checkEmailUser(this.user).subscribe((v) => {
        if (v.id != null) {
          alert("Email telah terdaftar!");
        }
        else {
          this.userService.createUser(this.user).subscribe((userData) => {
            if (userData != null && userData.id != null) {
              this.agency.userId = userData.id;
              this.agencyService.createAgency(this.agency).subscribe((agencyData) => {
                alert("Register User Succes!!")
                this.router.navigate(['/login']);
              });
            }
          });
        }
      });
    } else {
      alert("Password doesn't match!");
    }
  }
}
