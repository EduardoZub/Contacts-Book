import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactsDataService } from './admin/modules/contacts/services/contacts-data.service';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';

export const API = new InjectionToken<string>('API');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ContactsDataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: API,
      useValue: 'http://localhost:3000/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
