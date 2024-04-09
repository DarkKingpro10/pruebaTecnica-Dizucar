import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginI } from '../interface/loginI.interface';
import { EmpresaI } from '../interface/empresaI.interface';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
	MatSnackBar,
	MatSnackBarAction,
	MatSnackBarActions,
	MatSnackBarLabel,
	MatSnackBarRef,
  } from '@angular/material/snack-bar';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
	//title = 'Sistema de Inventario';
	hide = true;
	durationInSeconds = 3;
	loginForm: FormGroup;
	empresas: EmpresaI[] = [];

	constructor( 
		private api:LoginService, 
		private _snackBar: MatSnackBar, 
		private cookieService: CookieService,
		private router: Router,
		){

		this.loginForm = new FormGroup({
			empresa: new FormControl('', Validators.required),
			usuario: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		})
	}

	ngOnInit():void{
		this.obtenerEmpresas();
    }
	
	obtenerEmpresas(){
	}
	
	onLogin(){
		if(this.loginForm.valid){
			var snackBarRef = this._snackBar.openFromComponent(NotificationsComponent, {
				panelClass: 'session-success',
				duration: this.durationInSeconds * 1000,
				horizontalPosition: 'end',
				verticalPosition: 'top',
				data: { message: "Inicio de sesión exitoso"}
			});
			this.api.setToken();
			setTimeout(() => {
				//document.location.href = location.origin+"/dashboard";
				this.router.navigate(['/dashboard']);
			}, 2000);
		}
		else{
			this.validarCampos(this.loginForm);
		}
	}
	// Método para marcar campos inválidos
	validarCampos(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
		  const control = formGroup.get(field);
		  if (control instanceof FormGroup) {
			this.validarCampos(control);
		  } else {
			control!.markAsTouched({ onlySelf: true });
		  }
		});
	}
}

