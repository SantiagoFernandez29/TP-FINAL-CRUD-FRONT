import { Component, OnInit } from '@angular/core';
import { Docente } from '../../model/docente.model';
import { DocenteService } from '../../service/docente.service';
import { MatDialog } from '@angular/material/dialog';
import { DocenteModalComponent } from '../docente-modal/docente-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css',
})
export class DocenteComponent implements OnInit {
  docentes: Docente[] = [];

  constructor(
    private docenteService: DocenteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDocentes();
  }

  getDocentes(): void {
    this.docenteService.getDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  deleteDocente(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar este Docente?');
    if (!confirmation) {
      this.docenteService.deleteDocente(id).subscribe(() => {
        this.getDocentes();
      });
    }
  }

  updateDocente(docente: Docente): void {
    this.docenteService.updateDocente(docente.id, docente).subscribe(() => {
      this.getDocentes();
    });
  }

  openModalForAdd(): void {
    const dialogRef = this.dialog.open(DocenteModalComponent, {
      width: '650px',
      height: '296px',
      data: {
        nombre: '',
        legajo: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.docenteService.addDocente(result).subscribe(() => {
          this.getDocentes();
        });
      }
    });
  }

  openModalForUpdate(docente: Docente): void {
    const dialogRef = this.dialog.open(DocenteModalComponent, {
      width: '650px',
      height: '296px',
      data: docente,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateDocente(result);
      }
    });
  }
}
