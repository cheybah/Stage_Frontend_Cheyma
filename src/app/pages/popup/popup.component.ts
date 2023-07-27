import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
    selector: 'app-confirm-dialog',
    template: `
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        {{ data.message }}
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Annuler</button>
        <button mat-button [mat-dialog-close]="true" [color]="data.confirmColor">{{ data.confirmText }}</button>
      </mat-dialog-actions>
    `,
  })
  export class ConfirmDialogComponent {
  
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() confirmText: string = '';
    @Input() confirmColor: string = '';
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  }