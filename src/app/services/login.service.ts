import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginI } from '../interface/loginI.interface';
import { ResponseI } from '../interface/responseI.interface';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  baseUrl:      string = environment.endpoint;
  sistemaUrl:   string = environment.endpoint+'api/Sistema/';
  constructor(private http: HttpClient,
    private cookieService:CookieService) { }

  getEmpresas(): Observable<any>{
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.sistemaUrl+'ListadoEmpresas');
  }

  checkCredential(form:LoginI): Observable<ResponseI>{
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ResponseI>(this.sistemaUrl+'Login',form, { headers });
  }
  setToken(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzciI6IjI0IiwiZW1haWwiOiJtZWx2aW5ncmFuZGVAZGl6dWNhci5jb20iLCJpZEVtcCI6IjEiLCJmdWxsTmFtZSI6IkRhbmllbCIsImV4cCI6MTcxMDM5ODQyMX0.xngZPKozkT4ggmy2M_G5WfB0pRi4Pe-GlQVJkqZaqJg";
    this.cookieService.set('ditchToken', token);
  }
  
}
