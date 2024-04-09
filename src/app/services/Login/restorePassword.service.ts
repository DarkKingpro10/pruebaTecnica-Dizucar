import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
//import { LoginI } from '../interface/loginI.interface';
import { ResponseI } from './../../interface/responseI.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class RestorePassword {
  sistemaUrl:   string = environment.endpoint+'api/Sistema/';
  constructor(private http: HttpClient) { }

    sendEmail(email: string): Observable<ResponseI> {
        const headers = { 'Content-Type': 'application/json' };
        const form = { correo: email };
        return this.http.post<ResponseI>(this.sistemaUrl + 'RestorePassword', form, { headers });
    }
    
    changePassword(password: string, token: string): Observable<ResponseI>{
        const headers = { 'Content-Type': 'application/json' };
        const form = {
            password: password,
            token: token
          };
        return this.http.post<ResponseI>(this.sistemaUrl+'ResetPassword',form, { headers });
    }
}
