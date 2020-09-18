import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/constant/Agency';
import { AuthService } from 'src/app/auth/Auth.service';
import { AgencyService } from 'src/app/services/Agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  agency:Agency
  constructor(private auth: AuthService,private agencyService:AgencyService) {
    let authJwt = this.auth.getDecodedAccessToken();
    let iss = JSON.parse(authJwt.iss);
    this.agency=new Agency();
    this.agency.name="Agency Name";
    this.agency.details="Agency Detail";
    this.agencyService.getAgencyById(iss.agencyId).subscribe((v)=>{
      this.agency=v;
    });
   }

  ngOnInit(): void {
    let activeDashboard = document.getElementById("activeDashboard");
    activeDashboard.classList.remove("active");
    let activeAgency=document.getElementById("activeAgency");
    activeAgency.className += ' active'
    let activeBus=document.getElementById("activeBus");
    activeBus.classList.remove("active");
    let activeTrip=document.getElementById("activeTrip");
    activeTrip.classList.remove("active");
    let activeProfile=document.getElementById("activeProfile");
    activeProfile.classList.remove("active");
  }
  updateAgency(){
    this.agencyService.updateAgency(this.agency).subscribe((v)=>{
      alert('Update Complete!');
    });
  }

}
