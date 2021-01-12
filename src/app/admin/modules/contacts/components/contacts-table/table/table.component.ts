import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/admin/common/components/confirm/confirm.component';
import { ContactI, EditDataI } from 'src/app/common/models/contact';
import { ContactsDataService } from '../../../services/contacts-data.service';
import { ContactsTableService } from '../../../services/contacts-table.service';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @ViewChild('contactsTable') contactsTable: MatTable<any>;

  public expandedElement: ContactI;
  public displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  public dataSource = new MatTableDataSource([]);

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private _contactsService: ContactsDataService,
    private _contactsTableService: ContactsTableService,
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this._contactsTableService.contactsData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: ContactI[]) => {
        this.dataSource.data = res;
      });

    this._contactsTableService.tableFilter$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.onFilterChanged(value);
      });

    this._contactsTableService.newContact$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => {
        if (item) {
          this.dataSource.data.push(item);
          this.contactsTable?.renderRows();
          this._contactsTableService.openSnackBar(`Contact: ${item.name} HAVE BEEN ADDED`);
        }
      });
  }

  public openBottomModal(event: EditDataI): void {
    const bottomSheetRef = this._bottomSheet.open(FormComponent, {
      panelClass: 'bottom-sheet-cust-theme',
      data: {
        element: event.element,
        title: event.modalTitle,
      }
    });

    bottomSheetRef.afterDismissed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataFromChild) => {
        if (dataFromChild?.id) { this.onEditContact(dataFromChild); }
      });
  }

  public openConfirmDialogOnDelete(element: ContactI | null = null) {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      width: '100%',
      minWidth: '320px',
      maxWidth: '500px',
      data: {
        message: 'Are you really want to delete this contact?'
      }
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) { this.onDeleteContact(element); }
      });
  }

  private onDeleteContact(element: ContactI): void {
    this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
    this._contactsService.deleteContact(element.id).subscribe();
    this._contactsTableService.openSnackBar(`Contact: ${element.name} HAVE BEEN DELETED`)
  }

  private onEditContact(element: ContactI): void {
    if (!element) { return; }
    this._contactsService.editContact(element)
      .subscribe((respItem: ContactI) => {
        this.dataSource.data = this.dataSource.data.map(element => element.id == respItem.id ? respItem : element);
        this._contactsTableService.openSnackBar(`Contact: ${respItem.name} HAVE BEEN EDITED`);
      }, error => this._contactsTableService.openSnackBar(error.message, true));
  }


  private onFilterChanged(value: string): void {
    if (value.trim()) {
      this.dataSource.filter = value.trim().toLowerCase();

    } else {
      this.dataSource.filter = value;
    }
  }

  ngOnDestroy(): void {
    this._contactsTableService.contactsData$.next([]);
    this._contactsTableService.preloader$.next(true);
    this._contactsTableService.tableFilter$.next('');
    this._contactsTableService.newContact$.next(null);
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
