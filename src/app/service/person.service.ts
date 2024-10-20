import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/response-dto';
import { Person } from '../model/person';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  http = inject(HttpClient);
  url: string = 'http://localhost:8080/persons';
  storage = inject(LocalStorageService);

  createPerson(personObj: Person): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.url, personObj);
  }

  readPerson(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url);
  };

  updatePerson(personObj: Person): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.url, personObj);
  }

  deletePerson(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.url + '/' + id);
  }

  getLoggedInInfo(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/info', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.getItem('token')) });
  }
}
