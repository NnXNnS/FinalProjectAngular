import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/Auth.service';
import { BusService } from 'src/app/services/Bus.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Bus } from 'src/app/constant/Bus';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  gridData: GridDataResult;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  busList: any[];
  public pageSize = 10;
  public skip = 0;
  closeResult: string;
  bus: Bus;
  agencyId: string;
  constructor(private modalService: NgbModal, private busService: BusService, private auth: AuthService) {
    let authJwt = this.auth.getDecodedAccessToken();
    let iss = JSON.parse(authJwt.iss);
    this.bus = new Bus();
    this.agencyId = iss.agencyId;
    this.bus.agencyId = this.agencyId;
    this.getAllBus();
  }

  ngOnInit(): void {
    let activeDashboard = document.getElementById("activeDashboard");
    activeDashboard.classList.remove("active");
    let activeAgency = document.getElementById("activeAgency");
    activeAgency.classList.remove("active");
    let activeBus = document.getElementById("activeBus");
    activeBus.className += ' active'
    let activeTrip = document.getElementById("activeTrip");
    activeTrip.classList.remove("active");
    let activeProfile = document.getElementById("activeProfile");
    activeProfile.classList.remove("active");
  }
  
  public getAllBus() {
    this.busService.getAllBus(this.agencyId).subscribe((v) => {
      this.busList = v;
      this.loadItems();
    });

  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridData = {
      data: this.busList.slice(this.skip, this.skip + this.pageSize),
      total: this.busList.length
    };
  }
  deleteBus(id) {
    this.busService.getBusById(id).subscribe((v) => {
      if (confirm('are you sure delete ' + v.code + '?')) {
        this.busService.deleteBus(v).subscribe((v) => {
          this.getAllBus();
        });
      } else {

      }
    });
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
      this.busService.createBus(this.bus).subscribe((v) => {
        this.bus = new Bus();
        this.bus.agencyId = this.agencyId;
        this.getAllBus();
      });
      return `with: ${reason}`;
    } else if (reason === 'Cancel') {
      this.bus = new Bus();
      this.bus.agencyId = this.agencyId;
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }
  openEdit(content, id) {
    this.busService.getBusById(id).subscribe((v) => {
      this.bus = v;
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
      this.busService.updateBus(this.bus).subscribe((v) => {
        this.bus = new Bus();
        this.bus.agencyId = this.agencyId;
        this.getAllBus();
      });
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }
}
