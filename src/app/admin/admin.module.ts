import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routes';
import { ShareModule } from './common/share.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ShareModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
