import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

//Importación de tipos
import type { Pedido } from '../../../interface/pedido.interface';
import { PedidosResponse } from 'src/app/types/pedidos.type';

@Component({
  selector: 'calendarPedidos',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css'],
})
export class StadisticComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosSeleccionados: Pedido[] = [];
  fechaSeleccionada: string = '';

  constructor(private apiService: ApiservicesService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  generarColorAleatorio(anulado: boolean): string {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letras[Math.floor(Math.random() * 16)];
    }

    if (anulado && color === '#8a0808')
      color = this.generarColorAleatorio(anulado);

    return color;
  }

  getPedidos() {
    let campos =
      '[IdPedido], [FechaIngreso], [IdCliente], [IdClienteBodega], [IdEstatusPedidos], [DireccionEntrega], [DireccionFacturacion], [FechaHoraProgramadaEntrega], [FechaHoraEntregadoReal], [Anulado], [FechaAnulacion], [UsuarioAnulacion], [MotivoAnulacion], [CodigoOrigen], [FechaCreacion], [UsuarioCreacion], [IdClienteC], [NombreComercial], [Codigo]';

    let filters = [{ key: 'FechaFiltro', value: '01/03/2024' }];
    this.apiService
      .requestApi(
        '[LOGIS].[Vw_PedidosCab]',
        'r',
        '10',
        campos,
        'post',
        [],
        filters
      )
      .subscribe({
        next: (data: Pedido[]) => {
          this.pedidos = data.map((evento) => ({
            ...evento,
            id: evento.IdPedido,
            title: evento.NombreComercial,
            start: evento.FechaHoraProgramadaEntrega,
            color: this.generarColorAleatorio(evento.Anulado),
          }));
          
          this.calendarOptions.events = this.pedidos;
        },
        error: (e) => {
          console.error('Error al actualizar kardex:', e);
        },
        complete: () => console.info('complete'),
      });
  }

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: this.pedidos,
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  };
}
