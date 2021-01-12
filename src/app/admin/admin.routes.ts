import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';

const ADMIN_ROUTER: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'contacts'
            },
            {
                path: 'contacts',
                loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ADMIN_ROUTER)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
