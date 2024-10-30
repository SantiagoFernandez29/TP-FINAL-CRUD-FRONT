import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../model/alumno.model';

@Component({
  selector: 'app-alumno-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumno-modal.component.html',
  styleUrl: './alumno-modal.component.css',
})
export class AlumnoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }
}
