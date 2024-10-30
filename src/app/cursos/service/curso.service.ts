import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../model/curso.model';
import { Observable } from 'rxjs';
import { Alumno } from '../../alumno/model/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private API_URL = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {} // El HttpClient me permite manejar las solicitudes HTTP que se necesitan para interactuar con el BACKEND

  // el método http retorna un Observable, emitiendo una lista de cursos.
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.API_URL}/${id}`);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.API_URL}/add`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.API_URL}/update/${id}`, curso);
  }

  findCursosByFechaFin(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API_URL}/fecha-fin/${fechaFin}`);
  }

  findAlumnosByCursosVigentes(docenteId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.API_URL}/vigentes/docente/${docenteId}/alumnos`)
  }
}
