import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { UserService } from '../services/User.service';
declare var $: any

@Component({
  selector: 'routing-test-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  firstName: string = "";
  constructor(private route: ActivatedRoute, private auth: AuthService, router: Router,private userService:UserService) {

  }

  ngOnInit(): void {
    
    // let id = this.route.snapshot;
    // if ("/index" === id['_routerState'].url) {
    //   let activeDashboard = document.getElementById("activeDashboard");
    //   activeDashboard.className += ' active'
    // } else if ("/bus" === id['_routerState'].url) {
    //   let activeBus = document.getElementById("activeBus");
    //   activeBus.className += ' active'
    // } else if ("/agency" === id['_routerState'].url) {
    //   let activeAgency = document.getElementById("activeAgency");
    //   activeAgency.className += ' active'
    // } else if ("/trip" === id['_routerState'].url) {
    //   let activeTrip = document.getElementById("activeTrip");
    //   activeTrip.className += ' active'
    // } else if ("/profile" === id['_routerState'].url) {
    //   let activeProfile = document.getElementById("activeProfile");
    //   activeProfile.className += ' active'
    // }
    $('#sidebarToggle, #sidebarToggleTop').on('click', function (e) {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    });
    let authJwt = this.auth.getDecodedAccessToken();
    console.log(authJwt);
    let iss = JSON.parse(authJwt.iss);
    this.firstName = iss.userName.split(' ')[0];
    
    this.userService.getUserById(iss.userId).subscribe((v)=>{
      this.firstName = v.firstName
    });

  }
  logout() {
    $('.modal-backdrop').remove();
    this.auth.logout();
  }
}