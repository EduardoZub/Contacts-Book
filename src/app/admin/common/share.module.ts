import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
    declarations: [
        HeaderComponent,
        PreloaderComponent,
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        HeaderComponent,
        PreloaderComponent,
    ]
})
export class ShareModule { }