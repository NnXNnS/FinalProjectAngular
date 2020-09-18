import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/app/constant/user';
import { AuthService } from 'src/app/auth/Auth.service';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  name: string = "";
  password: string = "";
  constructor(private userService: UserService, private auth: AuthService) {
    this.user = new User();
    let authJwt = this.auth.getDecodedAccessToken();
    let iss = JSON.parse(authJwt.iss);
    this.userService.getUserById(iss.userId).subscribe((v) => {
      this.user = v;
      this.user.password = "";
      this.name = v.firstName + " " + v.lastName;
    });
  }

  ngOnInit(): void {
    let activeDashboard = document.getElementById("activeDashboard");
    activeDashboard.classList.remove("active");
    let activeAgency = document.getElementById("activeAgency");
    activeAgency.classList.remove("active");
    let activeBus = document.getElementById("activeBus");
    activeBus.classList.remove("active");
    let activeTrip = document.getElementById("activeTrip");
    activeTrip.classList.remove("active");
    let activeProfile = document.getElementById("activeProfile");
    activeProfile.className += ' active'
  }
  updateUser() {
    if (this.password != "") {
      this.user.password = this.password;
    }
    this.userService.updateUser(this.user).subscribe((v) => {
      this.user = v;
      this.user.password = "";
      this.password = "";
      this.name = v.firstName + " " + v.lastName;
      location.reload();
    });
  }
}
