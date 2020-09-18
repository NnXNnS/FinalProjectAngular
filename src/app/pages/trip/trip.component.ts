import { Component, OnInit } from '@angular/core';
import { Trip } from '../../constant/Trip';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TripService } from 'src/app/services/Trip.service';
import { AuthService } from 'src/app/auth/Auth.service';
import { Bus } from 'src/app/constant/Bus';
import { BusService } from 'src/app/services/Bus.service';
import { StopService } from 'src/app/services/Stop.service';
import { Stop } from 'src/app/constant/Stop';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  gridData: GridDataResult;
  tripList: any[];
  public pageSize = 10;
  public skip = 0;
  closeResult: string;
  trip: Trip;
  agencyId: string;
  busList: Bus[];
  stopList: Stop[];
  selectedValue: any;
  selectedValueSource: any;
  selectedValueDestination: any;
  constructor(private modalService: NgbModal, private tripService: TripService, private auth: AuthService, private busService: BusService, private stopService: StopService) {
    let authJwt = this.auth.getDecodedAccessToken();
    let iss = JSON.parse(authJwt.iss);
    this.trip = new Trip();
    this.agencyId = iss.agencyId;
    this.trip.agencyId = this.agencyId;
    this.getAllTrip();
    this.getAllBus();
    this.getAllStop();
  }

  ngOnInit(): void {
    let activeDashboard = document.getElementById("activeDashboard");
    activeDashboard.classList.remove("active");
    let activeAgency = document.getElementById("activeAgency");
    activeAgency.classList.remove("active");
    let activeBus = document.getElementById("activeBus");
    activeBus.classList.remove("active");
    let activeTrip = document.getElementById("activeTrip");
    activeTrip.className += ' active'
    let activeProfile = document.getElementById("activeProfile");
    activeProfile.classList.remove("active");
  }
  public getAllBus() {
    this.busService.getAllBus(this.agencyId).subscribe((v) => {
      this.busList = v;
      this.selectedValue = v[0];
    });

  }
  public getAllStop() {
    this.stopService.getAllStop().subscribe((v) => {
      this.stopList = v;
      this.selectedValueSource = v[0];
      this.selectedValueDestination = v[0];
    });

  }
  public getAllTrip() {
    this.tripService.getAllTrip(this.agencyId).subscribe((v) => {
      console.log(v);
      this.tripList = v;
      this.loadItems();
    });

  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  deleteTrip(id) {
    this.tripService.getTripById(id).subscribe((v) => {
      if (confirm('are you sure delete bus ' + v.bus.code + ' to ' + v.sourceStop.name + '?')) {
        this.tripService.deleteTrip(v.id).subscribe((v) => {
          this.getAllTrip();
        });
      } else {

      }
    });
  }
  private loadItems(): void {
    this.gridData = {
      data: this.tripList.slice(this.skip, this.skip + this.pageSize),
      total: this.tripList.length
    };
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'save click') {
      this.trip.bus = this.selectedValue;
      this.trip.sourceStop = this.selectedValueSource;
      this.trip.destinationStop = this.selectedValueDestination;
      this.tripService.createTrip(this.trip).subscribe((v) => {
        this.trip = new Trip();
        this.trip.agencyId = this.agencyId;
        this.getAllTrip();
      });
      return `with: ${reason}`;
    } else if (reason === 'Cancel') {
      this.trip = new Trip();
      this.trip.agencyId = this.agencyId;
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }
  openEdit(content, id) {
    this.tripService.getTripById(id).subscribe((v) => {
      this.trip = v;
      this.selectedValue = v.bus;
      this.selectedValueSource = v.sourceStop;
      this.selectedValueDestination = v.destinationStop;
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonEdit(reason)}`;
    });
  }

  private getDismissReasonEdit(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'save click') {
      this.trip.bus = this.selectedValue;
      this.trip.sourceStop = this.selectedValueSource;
      this.trip.destinationStop = this.selectedValueDestination;
      this.tripService.updateTrip(this.trip).subscribe((v) => {
        this.trip = new Trip();
        this.trip.agencyId = this.agencyId;
        this.getAllTrip();
      });
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }

}
