import { Alumno } from '../../alumno/model/alumno.model';
import { Docente } from '../../docentes/model/docente.model';
import { Tema } from '../../temas/model/tema.model';

// Defino el Tipo de dato Curso, con los campos que conforman dicha entidad.

export interface Curso {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  precio: number;
  tema: Tema;
  docente: Docente;
  alumnos: Alumno[];
}
