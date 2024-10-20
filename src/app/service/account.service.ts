import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { ResponseDto } from '../model/response-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient);
  url: string = 'http://localhost:8080/accounts';

  createAccount(accountObj: Account): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.url, accountObj);
  }

  updateAccount(accountObj: Account): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.url, accountObj);
  }

  deleteAccount(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.url + '/' + id);
  }
}
