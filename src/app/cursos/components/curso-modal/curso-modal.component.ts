import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../model/curso.model';
import { FormsModule } from '@angular/forms';
import { Docente } from '../../../docentes/model/docente.model';
import { Alumno } from '../../../alumno/model/alumno.model';
import { Tema } from '../../../temas/model/tema.model';
import { DocenteService } from '../../../docentes/service/docente.service';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { TemaService } from '../../../temas/service/tema.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './curso-modal.component.html',
  styleUrl: './curso-modal.component.css',
})
export class CursoModalComponent implements OnInit {
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  temas: Tema[] = [];

  constructor(
    public dialogRef: MatDialogRef<CursoModalComponent>, // referencio el Modal abierto.
    @Inject(MAT_DIALOG_DATA) public data: Curso, // inyecto en el modal abierto la data inicial suministrada.

    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    this.getDocentes();
    this.getAlumnos();
    this.getTemas();
  }

  getDocentes(): void {
    this.docenteService.getDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  getTemas(): void {
    this.temaService.getTemas().subscribe((data) => {
      this.temas = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }
}
