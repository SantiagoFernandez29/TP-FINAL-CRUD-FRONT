import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tema } from '../../model/tema.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tema-modal.component.html',
  styleUrl: './tema-modal.component.css',
})
export class TemaModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TemaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tema
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }
}
