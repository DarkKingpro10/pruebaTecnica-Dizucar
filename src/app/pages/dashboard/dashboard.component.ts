import { Component, ComponentFactoryResolver, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { Location } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiservicesService } from '../../services/apiservices.service';

declare var Scrollbar: any;
import * as moment from 'moment';
import { type PedidosResponse } from 'src/app/types/pedidos.type';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    menus: any  = [];
    path: string = "";
    notifications: any = [];
    moment = moment;
    show: boolean = false;
    @ViewChild('toast') toast?: NgbToastModule;

    constructor( 
		private cookieService: CookieService,
		private apiService: ApiservicesService,
		private router: Router,
        public dialog: MatDialog,
        private location: Location,
        private el: ElementRef,
		){ }
    ngOnInit():void{
        this.toggleSubMenu();
        this.toggleMenu();
        this.path = this.location.path();
        this.toggleSidebarMini();
        this.getPedidos();
    }
    ngAfterViewInit(): void {
        this.toggleSubMenu();
        this.toggleMenu();
        this.toggleMenuM();
        this.acctiosMenuMobile();
        if(this.el.nativeElement.querySelectorAll('.nav-link.active')[0].closest(".submenu") != null){ // PESTAÑA ACTIVA
            this.el.nativeElement.querySelectorAll('.nav-link.active')[0].closest(".submenu").classList.add("menu-open");
        }
        
    }
    toggleSidebar(){
        let side = document.getElementById("sidenav-main");
        if(side != undefined){
            (side!.classList.contains("showSide"))?side!.classList.remove('showSide'):side!.classList.add('showSide');
        }
    }
    toggleSubMenu(){
        const elementos = document.querySelectorAll('.submenu > a');
        // Recorrer cada elemento y asignar un evento click para submenu
        elementos.forEach((elemento, indice) => {
            elemento.addEventListener('click', () => {
                elemento.closest('.submenu')!.classList.toggle("menu-open");
            });
        });
        const elements = document.querySelectorAll('.submenu > ul > li > a');
        // Recorrer cada elemento y asignar un evento click para submenu
        elements.forEach((elemento, indice) => {
            elemento.addEventListener('click', () => {
                const elementos = document.querySelectorAll('.nav-sidebar  li  a.active');
                elementos.forEach(elemento => {
                    elemento.classList.remove("active");
                });
                elemento.classList.toggle("active");
                this.toggleSidebar();
                this.dialog.closeAll();
                
            });
        });
    }
    toggleMenu(){
        const elementos = document.querySelectorAll('.nav-sidebar > li > a');
        elementos.forEach((elemento, indice) => {
            elemento.addEventListener('click', () => {
                elementos.forEach(elemento => {
                    elemento.classList.remove("active");
                });
                elemento.classList.toggle("active");
                if (elemento.classList.contains("sbmenu") != true) {
                    this.toggleSidebar();
                }
            });
        });
    }
    toggleSidebarMini(){
        const elemento = document.getElementById('handler-menu');
        elemento!.addEventListener('click', () => {
            elemento!.closest(".content-main")!.classList.toggle("sidebar-mini");
        });
    }
    toggleMenuM(){
        document.querySelectorAll("#trans").forEach(element => {
            element.addEventListener('click', () => {
                document.querySelectorAll(".dv-up")[0].classList.toggle("open");
                document.querySelectorAll(".bg-backdrop")[0].classList.toggle("show");
                this.dialog.closeAll();
            });
        });
    }
    acctiosMenuMobile(){
        const elements = document.querySelectorAll('.m-up > li');
        elements.forEach((elemento, indice) => {
            elemento.addEventListener('click', () => {
                let tipo = elemento.getAttribute("data-action");
                this.router.navigate(['/transaction/'+tipo]);
                document.querySelectorAll(".dv-up")[0].classList.toggle("open");
                document.querySelectorAll(".bg-backdrop")[0].classList.toggle("show");
                this.dialog.closeAll();
            });
        });
    }
    getPedidos(){
        let campos = "[IdPedido], [FechaIngreso], [IdCliente], [IdClienteBodega], [IdEstatusPedidos], [DireccionEntrega], [DireccionFacturacion], [FechaHoraProgramadaEntrega], [FechaHoraEntregadoReal], [Anulado], [FechaAnulacion], [UsuarioAnulacion], [MotivoAnulacion], [CodigoOrigen], [FechaCreacion], [UsuarioCreacion], [IdClienteC], [NombreComercial], [Codigo]";
        let filters = [{key: "FechaFiltro" ,value: "01/03/2024"}];
        // this.apiService.requestApi("[LOGIS].[Vw_PedidosCab]", "r", "10", campos, "post", [], filters).subscribe({
        //     next: (data : PedidosResponse) => {
                
        //     },
        //     error: (e) => {
        //         console.error('Error al actualizar kardex:', e);
        //     },
        //     complete: () => console.info('complete')
        // });
    }

    logout(){
        this.cookieService.delete('ditchToken');
        localStorage.removeItem('ditchCred');
        localStorage.removeItem('ditchCr');
        this.router.navigate(['/login']);
    }
}
