import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from '../constant/Bus';
import { Trip } from '../constant/Trip';
import { Stop } from '../constant/Stop';

@Injectable({
    providedIn: 'root'
})
export class StopService {
    private BASE_URL = 'http://127.0.0.1:8080/api/stop';
    constructor(private http: HttpClient) {
    }
    getAllStop() {
        return this.http.post<Stop[]>(`${this.BASE_URL}/getAllStop`,'');
    }
}