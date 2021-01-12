import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactI } from 'src/app/common/models/contact';
import { AUTH_API } from 'src/app/common/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private _http: HttpClient) { }

  public getContacts(): Observable<ContactI[]> {
    return this._http.get<ContactI[]>(`${AUTH_API}contacts`, this.httpOptions);
  }

  public deleteContact(id: number): Observable<ContactI> {
    return this._http.delete<ContactI>(`${ AUTH_API }contacts/${id}`, this.httpOptions);
  }

  public addContact(entity: ContactI): Observable<ContactI> {
    return this._http.post<ContactI>(`${AUTH_API}contacts`, entity, this.httpOptions);
  }

  public editContact(entity: ContactI): Observable<ContactI> {
    return this._http.put<ContactI>(`${AUTH_API}contacts/${entity.id}`, entity, this.httpOptions);
  }
}
