import { NgModule } from '@angular/core';
import { ShareModule } from '../../common/share.module';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { TableDetailComponent } from './components/contacts-table/table-detail/table-detail.component';
import { TableComponent } from './components/contacts-table/table/table.component'
import { ContactsTableService } from './services/contacts-table.service';
import { TopActionsComponent } from './components/contacts-table/top-actions/top-actions.component';
import { TableActionsComponent } from './components/contacts-table/table-actions/table-actions.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ContactsTableComponent,
    SearchComponent,
    FormComponent,
    ConfirmComponent,
    TableDetailComponent,
    TableComponent,
    TopActionsComponent,
    TableActionsComponent,
  ],
  imports: [
    ShareModule,
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatRippleModule,
    MatDialogModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    ContactsTableService,
  ]
})
export class ContactsModule { }
