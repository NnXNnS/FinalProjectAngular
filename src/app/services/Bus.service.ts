import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Bus } from '../constant/Bus';

@Injectable({
	providedIn:'root'
})
export class BusService{
	private BASE_URL = 'http://127.0.0.1:8080/api/bus';
	constructor(private http: HttpClient){ 
    }
    getAllBus(agencyId:string){
        let formData= new FormData();
        formData.set("agencyId",agencyId);
        return this.http.post<Bus[]>(`${this.BASE_URL}/getAllBusByAgencyId`,formData);
    }
    getBusById(busId:string){
        let formData= new FormData();
        formData.set("busId",busId);
        return this.http.post<Bus>(`${this.BASE_URL}/getBusById`,formData);
    }
    updateBus(bus:Bus){
        return this.http.post(`${this.BASE_URL}/updateBus`,bus);
    }
    deleteBus(bus:Bus){
        return this.http.post(`${this.BASE_URL}/deleteBus`,bus);
    }
    createBus(bus:Bus){
        return this.http.post(`${this.BASE_URL}/createBus`,bus);
    }
}