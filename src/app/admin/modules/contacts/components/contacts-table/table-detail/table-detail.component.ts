import { Component, Input } from '@angular/core';
import { ContactI } from 'src/app/common/models/contact';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableDetailComponent {

  @Input() element: ContactI;
  @Input() expandedElement: ContactI;

  constructor() { }
}
