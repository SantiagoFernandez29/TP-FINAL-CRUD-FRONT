import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Docente } from '../../model/docente.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './docente-modal.component.html',
  styleUrl: './docente-modal.component.css',
})
export class DocenteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DocenteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Docente
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }
}
