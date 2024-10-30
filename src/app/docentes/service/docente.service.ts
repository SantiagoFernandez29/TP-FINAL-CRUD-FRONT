import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../model/docente.model';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private API_URL = 'http://localhost:8080/api/docentes';

  constructor(private http: HttpClient) {}

  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.API_URL);
  }

  getDocente(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.API_URL}/${id}`);
  }

  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.API_URL}/add`, docente);
  }

  deleteDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  updateDocente(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.API_URL}/update/${id}`, docente);
  }
}
