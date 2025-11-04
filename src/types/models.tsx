// forma de los libros de la api
export interface Libro {
  idLibro: number;
  titulo: string;
  autor: string;
  isbn: string;
  estado: string;
}

// forma de los libros en el form del front
export interface LibroFormValues {
  titulo: string;
  autor: string;
  isbn: string;
  estado: string;
}

// SOCIOS
export interface Socio {
  idsocio: number;
  nombre: string;
  apellido: string;
  nroSocio: string;
  dni: string;
}

// form para crear
export interface SocioFormValues {
  nombre: string;
  apellido: string;
  dni: string;
}

// form para actualizar
export interface SocioUpdateFormValues {
  nombre: string;
  apellido: string;
}

//PRESTAMOS

export interface PrestamoRequest {
  idLibro: number | null; // Usamos null para el estado inicial
  nroSocio: string;
}

export interface DevolucionRequest {
  idLibro: number | null; 
  nroSocio: string;
  buenasCondiciones: boolean;
}

export interface Prestamo {
  idPrestamo: number;
  fechaInicio: string; 
  fechaFin: string;
  fechaDevolucion: string | null;
  idLibro: number;
  libroTitulo: string;
  idSocio: number;
  socioNroSocio: string;
}

export interface Multa {
  idMulta: number;
  monto: number;
  idPrestamo: number;
  socioNombreCompleto: string;
  socioNroSocio: string;
  pagada: boolean;
  fechaGeneracion: string;
}
export interface MultaUpdateFormValues {
  monto: number;
}

export interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
