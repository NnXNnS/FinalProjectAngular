import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Bus } from '../constant/Bus';
import { Trip } from '../constant/Trip';

@Injectable({
	providedIn:'root'
})
export class TripService{
	private BASE_URL = 'http://127.0.0.1:8080/api/trip';
	constructor(private http: HttpClient){ 
    }
    getAllTrip(agencyId:string){
        let formData= new FormData();
        formData.set("agencyId",agencyId);
        return this.http.post<Bus[]>(`${this.BASE_URL}/getAllTrip`,formData);
    }
    getTripById(tripId:string){
        let formData= new FormData();
        formData.set("tripId",tripId);
        return this.http.post<Trip>(`${this.BASE_URL}/getTripById`,formData);
    }
    updateTrip(trip:Trip){
        return this.http.post(`${this.BASE_URL}/updateTrip`,trip);
    }
    deleteTrip(tripId:string){
        let formData= new FormData();
        formData.set("tripId",tripId);
        return this.http.post(`${this.BASE_URL}/deleteTrip`,formData);
    }
    createTrip(trip:Trip){
        return this.http.post(`${this.BASE_URL}/createTrip`,trip);
    }
}