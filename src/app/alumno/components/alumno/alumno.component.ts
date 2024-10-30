import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../model/alumno.model';
import { AlumnoModalComponent } from '../alumno-modal/alumno-modal.component';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  deleteAlumno(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar este Alumno?');
    if (!confirmation) {
    this.alumnoService.deleteAlumno(id).subscribe(() => {
      this.getAlumnos();
    });
  }
  }

  // Actualizar un alumno
  updateAlumno(alumno: Alumno): void {
    this.alumnoService.updateAlumno(alumno.id, alumno).subscribe(() => {
      this.getAlumnos(); // Refrescar la lista de alumnos después de actualizar
    });
  }

  openModalForAdd(): void {
    const dialogRef = this.dialog.open(AlumnoModalComponent, {
      width: '650px',
      height: '296px',
      data: {
        nombre: '',
        fechaNacimiento: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alumnoService.addAlumno(result).subscribe(() => {
          this.getAlumnos();
        });
      }
    });
  }

  // Abrir modal para editar un alumno
  openModalForUpdate(alumno: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoModalComponent, {
      width: '650px',
      height: '296px',
      data: alumno,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateAlumno(result); // Actualizar el alumno después de cerrar el modal
      }
    });
  }

  // updateAlumno(alumno: any): void {
  //   const dialogRef = this.dialog.open(AlumnoModalComponent, {
  //     width: '650px',
  //     height: '450px',
  //     data: alumno,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.alumnoService.updateAlumno(alumno.id, result).subscribe(() => {
  //         this.getAlumnos();
  //       });
  //     }
  //   });
  // }
}
