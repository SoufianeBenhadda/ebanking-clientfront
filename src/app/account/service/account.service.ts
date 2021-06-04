import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/account/module/account.module';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl: string;
  constructor(private http: HttpClient) {
    this.accountUrl = 'http://localhost:8091/compte';
  }

  public findAccountNum(id: string): Observable<Accounts> {
    return this.http.get<Accounts>(this.accountUrl + '/' + id);
  }
  public findAccountId(id: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(this.accountUrl + 's?id=' + id);
  }
}
