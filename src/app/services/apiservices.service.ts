import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { post } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  baseUrl:      string = environment.endpoint;
  sistemaUrl:   string = environment.endpoint+'api/Sistema/';
  constructor(
    private http: HttpClient,
    private cookieService:CookieService
  ) { }
  requestApi(table:string, accion:string, menu:string, campos:string, requestType:string="post", form:any, filters: any[]= []){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzciI6IjEiLCJlbWFpbCI6Im1lbHZpbmdyYW5kZUBkaXp1Y2FyLmNvbSIsImlkRW1wIjoiMSIsImZ1bGxOYW1lIjoianVhbiIsImV4cCI6MTcxMjcxOTIzOH0.xjQ6Est3hU26ktNgM4S2qydIV4RBfsTUgDqfpAVQ_90';
		var url = 'http://190.5.159.157:3000/api-c-kyber/118/4D6E95E0-5ABE-4F49-A000-901DB7371850';
    let headers: any = {
			  'Content-Type': 'application/json',
			  'js-access-token-permission': token,
			  "js-access-menu-permission": menu,
			  "js-access-crud-permission": accion,
			  "campos": campos,
			  "Tabla": table,
			}
    filters.forEach((filter,index) => {
      headers[filter.key] = filter.value;
    })
		const httpOptions = {
			headers: new HttpHeaders(headers)
		};
    
    if(requestType == "post"){
      return this.http.post<any>(url, form, httpOptions);
    }
    else{
      const params = filters.reduce((httpParams, filter, index) => {
        return httpParams.append(filter.key, filter.value);
      }, new HttpParams());
      return this.http.get<any>(url, { headers, params:params });
    }
  }
}
