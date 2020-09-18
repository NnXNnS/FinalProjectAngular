import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Agency } from '../constant/Agency';

@Injectable({
	providedIn:'root'
})
export class AgencyService{
	private BASE_URL = 'http://127.0.0.1:8080/api/agency';
	constructor(private http: HttpClient){ 
    }
    createAgency(agency:Agency){
        return this.http.post<Agency>(`${this.BASE_URL}/createAgency`,agency);
    }
    getAgencyById(agencyId:string){
        let formData= new FormData();
        formData.set("agencyId",agencyId);
        return this.http.post<Agency>(`${this.BASE_URL}/getAgencyById`,formData);
    }
    updateAgency(agency:Agency){
        return this.http.post<Agency>(`${this.BASE_URL}/updateAgency`,agency);
    }
}