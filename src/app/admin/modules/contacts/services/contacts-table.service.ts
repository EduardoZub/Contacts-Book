import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ContactI } from 'src/app/common/models/contact';
import { ContactsDataService } from './contacts-data.service';

@Injectable({
    providedIn: 'root'
})
export class ContactsTableService {

    public preloader$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public contactsData$: BehaviorSubject<ContactI[]> = new BehaviorSubject([]);
    public tableFilter$: BehaviorSubject<string> = new BehaviorSubject('');
    public newContact$: BehaviorSubject<ContactI> = new BehaviorSubject(null);

    private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(
        private _contactsService: ContactsDataService,
        private _snackBar: MatSnackBar
    ) { }

    public fetchTableData() {
        this._contactsService.getContacts()
            .pipe(finalize(() => this.preloader$.next(false)))
            .subscribe((data) => {
                this.contactsData$.next(data);
            });
    }

    public openSnackBar(message: string = 'message', isError: boolean = false): void {
        this._snackBar.open(message, 'Ok', {
            duration: 3000,
            panelClass: isError ? 'snack-bar-cust-theme--error' : 'snack-bar-cust-theme',
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}
