import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.module';
import { ContactI } from 'src/app/common/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  constructor(
    private _http: HttpClient,
    @Inject(API) public API_URL: string
  ) { }

  public getContacts(): Observable<ContactI[]> {
    return this._http.get<ContactI[]>(`${this.API_URL}contacts`);
  }

  public deleteContact(id: number): Observable<ContactI> {
    return this._http.delete<ContactI>(`${ this.API_URL }contacts/${id}`);
  }

  public addContact(entity: ContactI): Observable<ContactI> {
    return this._http.post<ContactI>(`${this.API_URL}contacts`, entity);
  }

  public editContact(entity: ContactI): Observable<ContactI> {
    return this._http.put<ContactI>(`${this.API_URL}contacts/${entity.id}`, entity);
  }
}
