import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactI } from 'src/app/common/models/contact';
import { ContactsDataService } from '../../../services/contacts-data.service';
import { ContactsTableService } from '../../../services/contacts-table.service';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-top-actions',
  templateUrl: './top-actions.component.html',
  styleUrls: ['./top-actions.component.scss']
})
export class TopActionsComponent implements OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private _contactsService: ContactsDataService,
    private _bottomSheet: MatBottomSheet,
    private _contactsTableService: ContactsTableService
  ) { }

  public onFilterChanged(value: string): void {
    this._contactsTableService.tableFilter$.next(value);
  }

  public openBottomModal(modalTitle: string): void {
    const bottomSheetRef = this._bottomSheet.open(FormComponent, {
      panelClass: 'bottom-sheet-cust-theme',
      data: {
        title: modalTitle
      }
    });

    bottomSheetRef.afterDismissed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataFromChild) => {
        if (!dataFromChild?.id) { this.onAddContact(dataFromChild); }
      });
  }

  private onAddContact(element: ContactI): void {
    if (!element) { return; }
    this._contactsService.addContact(element)
      .subscribe((addedItem: ContactI) => {
        this._contactsTableService.newContact$.next(addedItem);
      }, error => this._contactsTableService.openSnackBar(error.message, true));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
