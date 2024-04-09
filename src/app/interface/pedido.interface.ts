export interface Pedido {
  IdPedido: number;
  FechaIngreso: Date;
  IdCliente: number;
  IdClienteBodega: number;
  IdEstatusPedidos: number;
  DireccionEntrega: DireccionEntrega;
  DireccionFacturacion: DireccionFacturacion;
  FechaHoraProgramadaEntrega: Date;
  FechaHoraEntregadoReal: null;
  Anulado: boolean;
  FechaAnulacion: null;
  UsuarioAnulacion: null;
  MotivoAnulacion: null;
  CodigoOrigen: CodigoOrigen;
  FechaCreacion: Date;
  UsuarioCreacion: UsuarioCreacion;
  IdClienteC: number;
  NombreComercial: string;
  Codigo: string;
}

enum CodigoOrigen {
  Ecommerce = "Ecommerce",
  Empty = "",
  Externo = "Externo",
}

enum DireccionEntrega {
  DireccionX = "direccion X",
}

enum DireccionFacturacion {
  DireccionFacturacionX = "direccion facturacion X",
}

enum UsuarioCreacion {
  Admin = "Admin",
}