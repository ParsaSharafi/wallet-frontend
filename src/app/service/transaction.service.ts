import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDto } from '../model/response-dto';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  http = inject(HttpClient);
  url: string = 'http://localhost:8080/transactions';
  storage = inject(LocalStorageService);

  login(userObj: User): Observable<ResponseDto> {
    return this.http.post<ResponseDto>('http://localhost:8080/login', userObj);
  }

  getTransactions(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.getItem('token'))});
  }

  addTransaction(signedAmount: number): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.url + '/' + signedAmount, null, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.getItem('token'))});
  }
}
