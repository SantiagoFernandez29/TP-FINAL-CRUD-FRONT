import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../model/tema.model';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private API_URL = 'http://localhost:8080/api/temas';

  constructor(private http: HttpClient) {}

  getTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.API_URL);
  }

  getTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.API_URL}/${id}`);
  }

  addTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${this.API_URL}/add`, tema);
  }

  deleteTema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  updateTema(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.API_URL}/update/${id}`, tema);
  }
}
