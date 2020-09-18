import { Component, OnInit } from '@angular/core';
import '../../../assets/vendor/chartjs/Chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let activeDashboard = document.getElementById("activeDashboard");
    activeDashboard.className += ' active'
    let activeAgency=document.getElementById("activeAgency");
    activeAgency.classList.remove("active");
    let activeBus=document.getElementById("activeBus");
    activeBus.classList.remove("active");
    let activeTrip=document.getElementById("activeTrip");
    activeTrip.classList.remove("active");
    let activeProfile=document.getElementById("activeProfile");
    activeProfile.classList.remove("active");
    this.loadScript("../../../assets/js/demo/chart-area-demo.js");
    this.loadScript("../../../assets/js/demo/chart-pie-demo.js");
  }
  loadScript(src: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = src;
    body.appendChild(script);
  }
}
