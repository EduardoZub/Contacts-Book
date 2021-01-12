import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactI, EditDataI } from 'src/app/common/models/contact';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {

  @Input() element: ContactI = null;
  @Output() onEdit: EventEmitter<EditDataI> = new EventEmitter<EditDataI>();
  @Output() onDelete: EventEmitter<ContactI> = new EventEmitter<ContactI>();

  constructor() { }

  public openBottomModal(element: ContactI, modalTitle: string): void {
    const editData = {
      element,
      modalTitle
    }
    this.onEdit.emit(editData);
  }

  public openConfirmDialogOnDelete(element: ContactI): void {
    this.onDelete.emit(element);
  }

}
