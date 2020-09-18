import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { User } from '../constant/user';

@Injectable({
	providedIn:'root'
})
export class UserService{
	private BASE_URL = 'http://127.0.0.1:8080/api/user';
	constructor(private http: HttpClient){ 
    }
    checkEmailUser(user:User){
        return this.http.post<User>(`${this.BASE_URL}/checkEmailUserByUser`,user);
    }
    createUser(user:User){
        return this.http.post<User>(`${this.BASE_URL}/createUser`,user);
    }
    login(user:User){
        let formData= new FormData();
        formData.set("email",user.email);
        formData.set("password",user.password);
        return this.http.post<string>(`${this.BASE_URL}/login`,formData);
    }
    getUserById(userId:string){
        let formData= new FormData();
        formData.set("userId",userId);
        return this.http.post<User>(`${this.BASE_URL}/getUserById`,formData);
    }
    updateUser(user:User){
        return this.http.post<User>(`${this.BASE_URL}/updateUser`,user);
    }
}