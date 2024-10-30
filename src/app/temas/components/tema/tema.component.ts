import { Component, OnInit } from '@angular/core';
import { Tema } from '../../model/tema.model';
import { TemaService } from '../../service/tema.service';
import { MatDialog } from '@angular/material/dialog';
import { TemaModalComponent } from '../tema-modal/tema-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css',
})
export class TemaComponent implements OnInit {
  temas: Tema[] = [];

  constructor(private temaService: TemaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas(): void {
    this.temaService.getTemas().subscribe((data) => {
      this.temas = data;
    });
  }

  deleteTema(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar este Tema?');
    if (!confirmation) {
      this.temaService.deleteTema(id).subscribe(() => {
        this.getTemas();
      });
    }
  }

  updateTema(tema: Tema): void {
    this.temaService.updateTema(tema.id, tema).subscribe(() => {
      this.getTemas();
    });
  }

  openModalForAdd(): void {
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '650px',
      height: '296px',
      data: {
        nombre: '',
        descripcion: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.updateAlumno(result);
        console.log(result);
        this.temaService.addTema(result).subscribe(() => {
          this.getTemas();
        });
      }
    });
  }

  openModalForUpdate(tema: Tema): void {
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '650px',
      height: '296px',
      data: tema,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTema(result); // Actualizar el alumno después de cerrar el modal
        console.log(result);
      }
    });
  }
}
