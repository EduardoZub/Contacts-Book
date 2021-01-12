import { Component } from '@angular/core';
import { ContactsTableService } from '../../services/contacts-table.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent {

  public preloader: boolean = true;

  constructor(private _contactsTableService: ContactsTableService) {
    this._contactsTableService.preloader$.subscribe(loader => this.preloader = loader);
    this._contactsTableService.fetchTableData();
  }

}
