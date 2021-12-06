import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class AppMaterialModule { }
