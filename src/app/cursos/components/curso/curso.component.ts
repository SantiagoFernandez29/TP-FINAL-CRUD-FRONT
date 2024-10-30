import { Component, OnInit } from '@angular/core';
import { Curso } from '../../model/curso.model';
import { CursoService } from '../../service/curso.service';
import { MatDialog } from '@angular/material/dialog';
import { CursoModalComponent } from '../curso-modal/curso-modal.component';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { Alumno } from '../../../alumno/model/alumno.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso',
  standalone: true,
  // CommonModule para operaciones y FormsModule para el ngModel
  imports: [CommonModule, FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit{

  // inicializo listas vacías de cursos y alumnos
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];

  // inicializo las variables que contendrán el value ingresado en los imputs.
  fechaFin: string = '';
  docenteId: number = 0;

  cursosFiltrados: Curso[] = [];
  alumnosPorCurso: Alumno[] = [];

  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private dialog: MatDialog // utilizo MatDialog para manejar las acciones del Modal.
  ) {}

  // Al cargar el componente Curso se van a ejecutar dichas funciones
  // getCursos para completar la tabla con los cursos de la BDD.
  // getAlumnos para completar el listado de alumnos disponibles a seleccionar en AÑADIR o EDITAR.
  ngOnInit(): void {
    this.getCursos();
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    })
  }

  // ejecuto la función getCursos definida en el service, retornando los cursos de la BDD.
  // cuando ocurre quiero que la data que retorna dicha función se almacene en la lista de cursos.
  getCursos(): void {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  deleteCurso(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar este Curso?');
    if (!confirmation) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.getCursos();
      });
    }
  }

  // ejecuto la función updateCurso definida en el service, actualizando ese curso en la BDD.
  // cuando ocurre quiero traer nuevamente todos los cursos de la BDD, actualizando la tabla con el curso cambiado.
  updateCurso(curso: Curso): void {
    this.cursoService.updateCurso(curso.id, curso).subscribe(() => {
      this.getCursos();
    });
  }

  // cuando se presiona el botón AÑADIR CURSO se abre un Modal, referenciando al componente CursoModalComponent.
  // definiendo sus dimensiones y la inicialización del tipo de data a completar.
  openModalForAdd(): void {
    const dialogRef = this.dialog.open(CursoModalComponent, {
      width: '650px',
      height: '450px',
      data: {
        fechaInicio: '',
        fechaFin: '',
        precio: '',
        tema: null,
        docente: null,
        alumnos: null,
      },
    });

    // cuando se cierra el Modal, quiero que con la data que contiene los valores ingresados en cada input
    // se añada un nuevo curso, y cuando suceda que se actualice la tabla.
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService.addCurso(result).subscribe(() => {
          this.getCursos();
        });
      }
    });
  }

  openModalForUpdate(curso : Curso): void {
    const dialogRef = this.dialog.open(CursoModalComponent, {
      width: '650px',
      height: '450px',
      data: curso,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCurso(result);
      }
    });
  }

  findCursosByFechaFin(): void {
    if(this.fechaFin){
      this.cursoService.findCursosByFechaFin(this.fechaFin).subscribe((cursos) => {
        this.cursosFiltrados = cursos;
      })
    } else {
      this.cursosFiltrados = [];
    }
  }

  findAlumnosByDocente(): void {
    if(this.docenteId){
      this.cursoService.findAlumnosByCursosVigentes(this.docenteId).subscribe((alumnos) => {
        this.alumnosPorCurso = alumnos;
      })
    } else {
      this.alumnosPorCurso = [];
    }
  }
}
