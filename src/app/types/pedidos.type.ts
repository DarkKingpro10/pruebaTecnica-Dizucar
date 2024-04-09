export type PedidosResponse = {
  IdPedido:                   number;
  FechaIngreso:               Date;
  IdCliente:                  number;
  IdClienteBodega:            number;
  IdEstatusPedidos:           number;
  DireccionEntrega:           DireccionEntrega;
  DireccionFacturacion:       DireccionFacturacion;
  FechaHoraProgramadaEntrega: Date;
  FechaHoraEntregadoReal:     null;
  Anulado:                    boolean;
  FechaAnulacion:             null;
  UsuarioAnulacion:           null;
  MotivoAnulacion:            null;
  CodigoOrigen:               CodigoOrigen;
  FechaCreacion:              Date;
  UsuarioCreacion:            UsuarioCreacion;
  IdClienteC:                 number;
  NombreComercial:            string;
  Codigo:                     string;
}

export enum CodigoOrigen {
  Ecommerce = "Ecommerce",
  Empty = "",
  Externo = "Externo",
}

export enum DireccionEntrega {
  DireccionX = "direccion X",
}

export enum DireccionFacturacion {
  DireccionFacturacionX = "direccion facturacion X",
}

export enum UsuarioCreacion {
  Admin = "Admin",
}