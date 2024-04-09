import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private cookieService: CookieService,
	) { }

	canActivate(): boolean {
		return true
	}

	private isTokenExpired(expiration: number): boolean {
		return Date.now() >= expiration * 1000; // Verificar si el token ha expirado
	}
}