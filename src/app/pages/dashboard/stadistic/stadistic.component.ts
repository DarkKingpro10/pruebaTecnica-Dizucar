import { Component, ElementRef, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

//Importación de tipos
import type {
  Pedido,
  GroupedEventsByDate,
} from '../../../interface/pedido.interface';
import { PedidosResponse } from 'src/app/types/pedidos.type';

@Component({
  selector: 'calendarPedidos',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css'],
})
export class StadisticComponent implements OnInit {
  pedidos: Pedido[] = [];
  groupedEventsByDate: GroupedEventsByDate = {};
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

  groupEventsByDate(events: Pedido[]): GroupedEventsByDate {
    const groupedEvents: GroupedEventsByDate = {};

    events.forEach((evento) => {
      // Obtener la fecha en formato 'YYYY-MM-DD'
      const dateKey = evento.FechaHoraProgramadaEntrega.toString().split('T')[0];
      // Verificar si ya hay eventos para esta fecha
      if (!groupedEvents[dateKey]) {
        // Si no hay eventos para esta fecha, crear una nueva entrada en el objeto groupedEvents
        groupedEvents[dateKey] = [];
      }

      // Agregar el evento a la lista de eventos para esta fecha
      groupedEvents[dateKey].push(evento);
    });

    return groupedEvents;
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
          this.pedidos = data.map((evento, index) => ({
            ...evento,
            id: evento.IdPedido,
            title: evento.NombreComercial,
            start: evento.FechaHoraProgramadaEntrega,
            color: this.generarColorAleatorio(evento.Anulado),
          }));

          this.calendarOptions.events = this.pedidos;
          this.groupedEventsByDate = this.groupEventsByDate(data);
        },
        error: (e) => {
          console.error('Error al actualizar kardex:', e);
        },
        complete: () => console.info('complete'),
      });
  }

  showEventsForDate(date: string) {
    this.fechaSeleccionada = date;
    // Obtener los eventos para la fecha seleccionada
    console.log(this.groupedEventsByDate);
    const eventsForDate = this.groupedEventsByDate[date] || [];
    console.log(eventsForDate); // Imprimir los eventos para la fecha seleccionada en la consola
    // Aquí puedes mostrar un panel lateral u otra sección de la interfaz de usuario
  }

  calendarOptions: CalendarOptions = {
    themeSystem: "Literia",
    dayMaxEventRows:true,
    views:{
      timeGrid:{
        dayMaxEventRows: 6 
      }
    },
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
    eventClick: (arg) => {
      // Cuando se hace clic en un día, mostramos los eventos para esa fecha
      if (arg.event.start) {
        this.showEventsForDate(arg.event.start.toISOString().split('T')[0]);
      }
    },
  };
}