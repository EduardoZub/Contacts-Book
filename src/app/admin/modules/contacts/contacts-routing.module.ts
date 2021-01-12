import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';

const routes: Routes = [
    {
        path: '',
        component: ContactsTableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
